/* eslint-disable valid-jsdoc */
/* eslint-disable import/no-extraneous-dependencies */
import bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { database } from '../config';
import { generateToken } from '../utils';

/**
 * The authentication service.
 */
export class AuthServices {
  private static authRepository: Repository<User> =
    database.getRepository(User);

  /**
   * Logs in a user.
   * @param email The user's email.
   * @param password The user's password.
   * @returns {Promise<string | null>} The user's id if successful, null otherwise.
   */
  static async loginService(
    email: string,
    password: string
  ): Promise<string | null> {
    const user = await this.authRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    return token;
  }
}
