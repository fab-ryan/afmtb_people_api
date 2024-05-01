/* eslint-disable import/no-extraneous-dependencies */
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
/* eslint-disable require-jsdoc */
import { User, Profile } from '../entities';
import { database } from '../config';
import { CreateUserRequest } from '../types';
import { AccountService } from './accountService';
import { generateAccountNumber } from '../utils';
/**
 * The user service.
 */
export class UserService {
  private static repository: Repository<User> = database.getRepository(User);

  private static profileRepository: Repository<Profile> =
    database.getRepository(Profile);

  /**
   * Creates a new user.
   * @param user The user object.
   * @returns The created user.
   */

  static async createUser(user: CreateUserRequest) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password.toString(), salt);
    user.password = hashedPassword;
    const newUser = this.repository.save(user);
    const accout = await AccountService.create({
      account_number: generateAccountNumber(),
      bank_name: 'BK',
      bank_branch: 'Kigali',
    });
    (await newUser).account = accout;
    await this.repository.save(await newUser);

    const userDetails = await this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.account', 'account')
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.role',
        'user.created_at',
        'user.updated_at',
      ])

      .where('user.id = :id', { id: (await newUser).id })
      .getOne();
    return { user: userDetails };
  }

  static async getAllUsers(): Promise<Omit<User[], 'password'>> {
    const users = await this.repository.find({
      select: ['id', 'name', 'email', 'role', 'created_at', 'updated_at'],
    });
    return users;
  }

  static async userExists(email: string): Promise<boolean> {
    const user = await this.repository.findOne({ where: { email } });
    return !!user;
  }

  static async getUserById(id: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.repository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'role', 'created_at', 'updated_at'],
      relations: ['profile', 'account'],
    });
    return user;
  }

  static async updateUserProfile(
    user: Omit<User, 'password'>,
    profile: Profile
  ) {
    const userToUpdate = await this.repository.findOne({
      where: { id: user.id },
      relations: ['profile'],
    });
    if (!userToUpdate) {
      return null;
    }
    userToUpdate.profile = profile;
    await this.profileRepository.save(profile);
    const updatedUser = await this.repository.save(userToUpdate);
    return {
      ...updatedUser,
      password: undefined,
    };
  }

  static async getProfile(id: string) {
    const profile = await this.profileRepository
      .createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user')
      .leftJoinAndSelect('user.account', 'account')
      .select([
        'profile.id',
        'profile.phone',
        'profile.address',
        'profile.created_at',
        'profile.updated_at',
      ])
      .where('profile.id = :id', { id })
      .getOne();
    return profile;
  }

  static async updateProfile(profile: Profile, data: Profile) {
    Object.assign(profile, data);
    await this.profileRepository.save(profile);
  }
}
