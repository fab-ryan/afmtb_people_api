/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
/* eslint-disable import/no-extraneous-dependencies */
import Database, { User, Income } from '../database';

/**
 * The income service.
 */
export class IncomeService {
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
    const income = await Database.Income.create({
      source,
      amount,
      balance: balance ?? 0,
      user_id: user.id,
      description: description ?? '',
    });

    const incomeData = await Database.Income.findOne({
      where: { id: income.id },
      include: [
        {
          model: Database.User,
          as: 'user',
        },
      ],
    });
    return incomeData;
  }

  static async getAccountBalanceService(user: Omit<User, 'password'>) {
    const userId = user.id;
    const incomes = await Database.Income.findOne({
      where: {
        user_id: userId,
      },
    });
    // .createQueryBuilder('income')
    // .where('income.user.id = :user', { user: userId })
    // .orderBy('income.created_at', 'DESC') // Assuming 'timestamp' is the column name for the timestamp
    // .limit(1)
    // .getOne();
    const balance = incomes ? incomes.balance : 0;
    return balance;
  }

  static async getAllIncomes(user: Omit<User, 'password'>) {
    const user_id = user.id;
    const incomes = await Database.Income.findAll({
      where: {
        user_id,
      },
    });

    if (!incomes) {
      return [];
    }

    incomes.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
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
    const income = await Database.Income.findOne({
      where: {
        user_id: userId,
      },
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

    const updatedIncome = Object.assign(income, {
      source: income.source,
      amount: income.amount,
      balance: income.balance,
      description: income.description,
    });
    Database.Income.update(updatedIncome, {
      where: { id: incomeId },
    });
    return updatedIncome;
  }

  static async deleteIncomeService(userId: string, incomeId: string) {
    const income = await Database.Income.findOne({
      where: {
        user_id: userId,
        id: incomeId,
      },
    });
    if (!income) {
      throw new Error('Income not found');
    }

    const deletedIncome = await Database.Income.destroy({
      where: {
        id: incomeId,
      },
    });
    return deletedIncome;
  }
}
