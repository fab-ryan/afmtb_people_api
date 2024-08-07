/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
import Database, { Account, AccountCreationAttributes } from '../database';

// interface AccountData {
//   account_number: string;
//   bank_name: string;
//   bank_branch: string;
// }
export class AccountService {
  static async create(data: AccountCreationAttributes): Promise<Account> {
    const account = await Database.Account.create(data);
    return account;
  }

  static async getAccountByNumber(
    account_number: string
  ): Promise<Account | null> {
    return Database.Account.findOne({
      where: { account_number },
    });
  }

  static async updateBalance(userId: string, amount: number) {
    const account = await Database.Account.findOne({
      where: { user_id: userId },
    });

    if (!account) {
      throw new Error('Account not found');
    }
    account.balance += amount;
    const updatedAccount = await account.save();
    return updatedAccount;
  }
}
