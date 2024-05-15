/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
/* eslint-disable import/no-extraneous-dependencies */
import bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { database } from '../config';
import { generateToken, sendEmail } from '../utils';

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
    username: string,
    password: string
  ): Promise<string | null> {
    const user = await this.authRepository.findOne({
      where: { ...this.userNameWhere(username) },
    });
    if (!user) {
      return null;
    }

    const isPasswordValid = bcrypt.compareSync(
      password.toString(),
      user.password
    );
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

  static userNameWhere(username: string): Record<string, string> {
    if (username.includes('@')) {
      return { email: username };
    }

    return { phone: this.formatPhoneNumber(username) };
  }

  static formatPhoneNumber(phone: string): string {
    if (phone.startsWith('0')) {
      return phone;
    }
    if (phone.startsWith('+')) {
      return `0${phone.slice(4)}`;
    }

    return `0${phone.slice(3)}`;
  }

  static async forgotPassword(username: string) {
    const user = await this.authRepository.findOne({
      where: { ...this.userNameWhere(username) },
    });
    if (!user) {
      return null;
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const token = generateToken({
      otp,
      id: user.id,
    });

    const mailOptions = {
      to: user.email,
      subject: 'Password Reset',
      template: 'forgotPassword',
      context: {
        otp,
      },
    };
    await sendEmail(mailOptions);

    return token;
  }
}
