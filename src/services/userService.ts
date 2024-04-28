/* eslint-disable import/no-extraneous-dependencies */
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
/* eslint-disable require-jsdoc */
import { User } from '../entities';
import { database } from '../config';
import { CreateUserRequest } from '../types';
/**
 * The user service.
 */
export class UserService {
  private static repository: Repository<User> = database.getRepository(User);

  /**
   * Creates a new user.
   * @param user The user object.
   * @returns The created user.
   */

  static async createUser(user: CreateUserRequest): Promise<User> {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    user.password = hashedPassword;
    const newUser = this.repository.save(user);
    return {
      ...newUser,
      password: undefined,
    };
  }

  static async getAllUsers(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }

  static async userExists(email: string): Promise<boolean> {
    const user = await this.repository.findOne({ where: { email } });
    return !!user;
  }
}
