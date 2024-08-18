import { config } from '../config';
import Database, {
  DepositeAttributes,
  DepositeCreationAttributes,
  Deposit,
} from '../database';
import { generateAccountNumber } from '../utils';
import { AccountService } from './accountService';
/**
 * DepositService
 * @class
 */
class DepositService {
  /**
   * Create deposit
   * @param {DepositeCreationAttributes} deposit
   * @returns {Promise<Deposit>} The created deposit
   * @memberof DepositService
   * @static
   */
  static async createDeposit(
    deposit: DepositeCreationAttributes
  ): Promise<Deposit> {
    const user = await Database.User.findOne({ where: { id: deposit.userId } });
    if (!user) throw new Error('User not found');
    const account = await Database.Account.findOne({
      where: { user_id: deposit.userId },
    });
    if (!account) {
      AccountService.create({
        account_number: generateAccountNumber(),
        bank_name: 'BK',
        bank_branch: 'Kigali',
        balance: Number(config?.OTHERS?.INITIAL_BALANCE || 0),
        user_id: user.id,
      });
    }
    if (account && account.balance < Number(deposit.amount)) {
      throw new Error('Insufficient balance');
    }

    if (account) {
      account.balance += Number(deposit.amount);
      await account.save();
    }

    return Database.Deposit.create({
      ...deposit,
    });
  }

  /**
   * Get all deposits
   * @returns {Promise<Deposit[]>} The list of deposits
   * @memberof DepositService
   * @param {string} id
   * @static
   */
  static async getDeposits(id: string): Promise<Deposit[]> {
    return Database.Deposit.findAll({ where: { userId: id } });
  }

  /**
   * Get a deposit
   * @param {string} id - The deposit id
   * @returns {Promise<Deposit | null>} The deposit
   * @memberof DepositService
   * @static
   */
  static async getDeposit(id: string): Promise<Deposit | null> {
    const deposit = await Database.Deposit.findOne({ where: { id } });
    if (!deposit) return null;
    return deposit;
  }

  /**
   * Update a deposit
   * @param {string} id - The deposit id
   * @param {DepositeCreationAttributes} deposit
   * @returns {Promise<Deposit | null>} The updated deposit
   * @memberof DepositService
   * @static
   */
  static async updateDeposit(
    id: string,
    deposit: Partial<DepositeAttributes>
  ): Promise<Deposit | null> {
    const foundDeposit = await Database.Deposit.findOne({ where: { id } });
    if (!foundDeposit) return null;

    await foundDeposit.update(deposit);
    return foundDeposit;
  }

  /**
   * Delete a deposit
   * @param {string} id - The deposit id
   * @returns {Promise<boolean>} The result
   * @memberof DepositService
   * @static
   */
  static async deleteDeposit(id: string): Promise<boolean> {
    const deposit = await Database.Deposit.findOne({ where: { id } });
    if (!deposit) return false;

    await deposit.destroy();
    return true;
  }
}

export { DepositService };
