import { Op } from 'sequelize';
import Database from '../database';

/**
 * DashboardService
 * @class
 */
class DashboardService {
  /**
   * Get all incomes
   * @returns {Promise<Income[]>} The list of incomes
   * @memberof DashboardService
   * @static
   * @param {string} userId
   */
  static async getDashboardData(userId: string) {
    const incomesCounts = await Database.Income.count({
      where: { user_id: userId },
    });
    const depositsCounts = await Database.Deposit.count({
      where: { user_id: userId },
    });

    const expensesCounts = await Database.Expense.count({
      where: { user_id: userId },
    });
    const withdrawaCounts = await Database.Withdraw.count({
      where: { user_id: userId },
    });
    const account = await Database.Account.findOne({
      where: { user_id: userId },
    });

    return {
      incomesCounts,
      depositsCounts,
      expensesCounts,
      withdrawaCounts,
      account,
    };
  }

  /**
   * Get expenses Data by date in Year
   * @returns {Promise<Expense[]>} The list of expenses
   * @memberof DashboardService
   * @static
   * @param {string} userId
   *
   * @param {string} year
   */
  static async getExpensesDataByYear({
    userId,
    year,
  }: {
    userId: string;
    year: string;
  }) {
    const expensesByMonth = Array(12).fill(0);
    const expenses = await Database.Expense.findAll({
      where: {
        user_id: userId,
        createdAt: {
          [Op.between]: [`${year}-01-01`, `${year}-12-31`],
        },
      },
    });
    expenses.forEach(expense => {
      const month = new Date(expense.createdAt).getMonth(); // getMonth returns 0 for January, 1 for February, etc.
      expensesByMonth[month] += expense.amount; // Assuming 'amount' is the field that holds the expense value
    });
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const result = monthNames.map((month, index) => ({
      month,
      total: expensesByMonth[index],
    }));

    return result;
  }
}

export { DashboardService };
