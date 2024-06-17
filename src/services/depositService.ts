import Database, {
  DepositeAttributes,
  DepositeCreationAttributes,
  Deposit,
} from '../database';

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
    return Database.Deposit.create(deposit);
  }

  /**
   * Get all deposits
   * @returns {Promise<Deposit[]>} The list of deposits
   * @memberof DepositService
   * @static
   */
  static async getDeposits(): Promise<Deposit[]> {
    return Database.Deposit.findAll();
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
