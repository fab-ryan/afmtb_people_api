/* eslint-disable import/no-extraneous-dependencies */
import bcrypt from 'bcryptjs';
/* eslint-disable require-jsdoc */
import { AccountService } from './accountService';
import { generateAccountNumber } from '../utils';
import Database, {
  Account,
  Profile,
  User,
  UserCreationAttributes,
} from '../database';
import { config } from '../config';
import { AuthServices } from './authService';

/**
 * The user service.
 */
export class UserService {
  /**
   * Creates a new user.
   * @param user The user object.
   * @returns The created user.
   */

  static async createUser(user: UserCreationAttributes) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password.toString(), salt);
    user.password = hashedPassword;
    const newUser = await Database.User.create({
      ...user,
      role: user.role || 'user',
      status: 'active',
      phone: AuthServices.formatPhoneNumber(user.phone),
    });

    if (!newUser) return null;

    await AccountService.create({
      account_number: generateAccountNumber(),
      bank_name: 'BK',
      bank_branch: 'Kigali',
      balance: Number(config?.OTHERS?.INITIAL_BALANCE || 0),
      user_id: newUser.id,
    });

    const userDetail = await Database.User.findOne({
      where: { id: newUser.id },
      include: [
        {
          model: Account,
          as: 'account',
        },
      ],
    });
    return userDetail;
  }

  static async getAllUsers(): Promise<Omit<User[], 'password'>> {
    const users = await Database.User.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
    return users;
  }

  static async userExists(email: string): Promise<boolean> {
    const user = await Database.User.findOne({ where: { email } });
    return !!user;
  }

  static async getUserById(id: string): Promise<Omit<User, 'password'> | null> {
    const user = await Database.User.findOne({
      where: { id },
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Account,
          as: 'account',
        },
        {
          model: Profile,
          as: 'profile',
        },
      ],
    });
    return user;
  }

  static async updateUserProfile(
    user: Omit<User, 'password'>,
    profile: Profile
  ) {
    const userToUpdate = await Database.Profile.findOne({
      where: { user_id: user.id },
    });
    if (!userToUpdate) {
      return null;
    }
    const updatedUser = this.updateProfile(userToUpdate, profile);
    return {
      ...updatedUser,
      password: undefined,
    };
  }

  static async getProfile(id: string) {
    console.log('id', id);
    const profile = await Database.Profile.findOne({
      where: { user_id: id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['password'],
          },
          include: [
            {
              model: Account,
              as: 'account',
            },
          ],
        },
      ],
    });
    return profile;
  }

  static async updateProfile(profile: Profile, data: Profile) {
    Object.assign(profile, data);
    const updateProfile = await profile.save();

    return updateProfile;
  }

  static async phoneExists(phone: string): Promise<boolean> {
    const formattedPhone = AuthServices.formatPhoneNumber(phone);
    const user = await Database.User.findOne({
      where: { phone: formattedPhone },
    });
    return !!user;
  }
}
