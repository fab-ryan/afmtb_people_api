/* eslint-disable import/no-extraneous-dependencies */
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
/* eslint-disable require-jsdoc */
import { User, Profile } from '../entities';
import { database } from '../config';
import { CreateUserRequest } from '../types';
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

  static async createUser(
    user: CreateUserRequest
  ): Promise<Omit<User, 'password'>> {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    user.password = hashedPassword;
    const newUser = this.repository.save(user);
    return {
      ...newUser,
      password: undefined,
    };
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
      relations: ['profile'],
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

  static async getProfile(id: string): Promise<Profile | null> {
    const profile = await this.profileRepository.findOne({ where: { id } });
    return profile;
  }

  static async updateProfile(profile: Profile, data: Profile) {
    Object.assign(profile, data);
    await this.profileRepository.save(profile);
  }
}
