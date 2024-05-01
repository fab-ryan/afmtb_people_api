/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
import { database } from '../config';
import { Account } from '../entities';

interface AccountData {
  account_number: string;
  bank_name: string;
  bank_branch: string;
}
export class AccountService {
  private static accountRepository = database.getRepository(Account);

  static async create(data: AccountData): Promise<Account> {
    return this.accountRepository.save(data);
  }

  static async getAccountByNumber(
    account_number: string
  ): Promise<Account | null> {
    return this.accountRepository.findOne({ where: { account_number } });
  }

  static async updateBalance(userId: string, amount: number) {
    const account = await this.accountRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!account) {
      throw new Error('Account not found');
    }
    account.balance += amount;
    const updatedAccount = await this.accountRepository
      .createQueryBuilder()
      .update(Account)
      .set({ balance: account.balance })
      .where('id = :id', { id: account.id })
      .returning('*')
      .execute();
    return updatedAccount;
  }
}
