import Database, { Withdraw, WithdrawCreationAttributes } from '../database';

/**
 * WithdrawService
 * @class
 */
export class WithdrawService {
  /**
   * Create withdraw
   * @param {WithdrawCreationAttributes} withdraw
   * @returns {Promise<Withdraw>} The created withdraw
   * @memberof WithdrawService
   * @static
   */
  static async createWithdraw(
    withdraw: WithdrawCreationAttributes
  ): Promise<Withdraw> {
    const user = await Database.User.findOne({
      where: { id: withdraw.userId },
    });
    if (!user) throw new Error('User not found');
    const account = await Database.Account.findOne({
      where: { user_id: withdraw.userId },
    });
    if (!account) throw new Error('Account not found');
    if (account.balance < Number(withdraw.amount)) {
      throw new Error('Insufficient balance');
    }

    account.balance -= Number(withdraw.amount);

    await account.save();
    return Database.Withdraw.create({
      ...withdraw,
      balanceBefore: account.balance + Number(withdraw.amount),
    });
  }

  /**
   * Get all withdraws
   * @returns {Promise<Withdraw[]>} The list of withdraws
   * @memberof WithdrawService
   * @param {string} id
   * @static
   */
  static async getWithdraws(id: string): Promise<Withdraw[]> {
    return Database.Withdraw.findAll({
      where: { userId: id },
      include: [
        {
          model: Database.User,
          as: 'user',
          include: [{ model: Database.Account, as: 'account' }],
        },
      ],
    });
  }

  /**
   * Get a withdraw
   * @param {string} id - The withdraw id
   * @returns {Promise<Withdraw | null>} The withdraw
   * @memberof WithdrawService
   * @static
   */
  static async getWithdraw(id: string): Promise<Withdraw | null> {
    const withdraw = await Database.Withdraw.findOne({ where: { id } });
    if (!withdraw) return null;
    return withdraw;
  }

  /**
   * Update a withdraw
   * @param {string} id - The withdraw id
   * @param {WithdrawCreationAttributes} withdraw
   * @returns {Promise<Withdraw | null>} The updated withdraw
   * @memberof WithdrawService
   * @static
   */
  static async updateWithdraw(
    id: string,
    withdraw: Partial<WithdrawCreationAttributes>
  ): Promise<Withdraw | null> {
    const foundWithdraw = await Database.Withdraw.findOne({ where: { id } });
    if (!foundWithdraw) {
      return null;
    }
    await foundWithdraw.update(withdraw);
    return foundWithdraw;
  }

  /**
   * Delete a withdraw
   * @param {string} id - The withdraw id
   * @returns {Promise<Withdraw | null>} The deleted withdraw
   * @memberof WithdrawService
   * @static
   */
  static async deleteWithdraw(id: string): Promise<Withdraw | null> {
    const withdraw = await Database.Withdraw.findOne({ where: { id } });
    if (!withdraw) {
      return null;
    }
    await withdraw.destroy();
    return withdraw;
  }
}
