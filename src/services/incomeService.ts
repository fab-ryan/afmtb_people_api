/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
/* eslint-disable import/no-extraneous-dependencies */
import { Repository } from 'typeorm';
import { Income, User } from '../entities';
import { database } from '../config';

/**
 * The income service.
 */
export class IncomeService {
  private static incomeRepository: Repository<Income> =
    database.getRepository(Income);

  static async createIncomeService(
    user: Omit<User, 'password'>,
    {
      source,
      amount,
      description,
      balance,
    }: {
      source: string;
      amount: number;
      balance?: number;
      description?: string;
    }
  ): Promise<Omit<Income, 'user'> | null> {
    const income = new Income();
    income.source = source;
    income.amount = amount;
    income.balance = amount;
    if (balance) {
      income.balance = balance;
    }
    if (description) {
      income.description = description;
    }
    income.user = user;

    const newIncomes = this.incomeRepository.save(income);
    return newIncomes;
  }

  static async getAccountBalanceService(user: Omit<User, 'password'>) {
    const userId = user.id;
    const incomes = await this.incomeRepository
      .createQueryBuilder('income')
      .where('income.user.id = :user', { user: userId })
      .orderBy('income.created_at', 'DESC') // Assuming 'timestamp' is the column name for the timestamp
      .limit(1)
      .getOne();
    const balance = incomes ? incomes.balance : 0;
    return balance;
  }

  static async getAllIncomes(user: Omit<User, 'password'>) {
    const userId = user.id;
    const incomes = await this.incomeRepository
      .createQueryBuilder('income')
      .where('income.user.id = :user', { user: userId })
      .getMany();

    if (!incomes) {
      return [];
    }

    incomes.sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
    return incomes;
  }
}
