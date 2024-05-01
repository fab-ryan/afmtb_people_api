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

    const incomeData = await this.incomeRepository
      .createQueryBuilder('income')
      .where('income.id = :id', { id: (await newIncomes).id })
      .getOne();
    return incomeData;
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

  static async updateIncomeService(
    userId: string,
    incomeId: string,
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
  ) {
    const income = await this.incomeRepository.findOne({
      where: { user: { id: userId }, id: incomeId },
    });

    if (!income) {
      throw new Error('Income not found');
    }
    income.source = source;
    income.amount = amount;
    income.balance = amount;
    if (balance) {
      income.balance = balance;
    }
    if (description) {
      income.description = description;
    }

    const updatedIncome = await this.incomeRepository
      .createQueryBuilder()
      .update(Income)
      .set(income)
      .where('id = :id', { id: income.id })
      .returning('*')
      .execute();
    return updatedIncome;
  }

  static async deleteIncomeService(userId: string, incomeId: string) {
    const income = await this.incomeRepository.findOne({
      where: { user: { id: userId }, id: incomeId },
    });

    if (!income) {
      throw new Error('Income not found');
    }

    const deletedIncome = await this.incomeRepository
      .createQueryBuilder()
      .delete()
      .from(Income)
      .where('id = :id', { id: income.id })
      .execute();
    return deletedIncome;
  }
}
