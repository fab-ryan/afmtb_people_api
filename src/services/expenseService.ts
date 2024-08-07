import Database, {
  Expense,
  ExpensesAttributes,
  ExpensesCreationAttributes,
} from '../database';
/**
 * ExpenseService class
 * @class
 * @classdesc ExpenseService class to interact
 * with the ExpenseCategory table
 */
class ExpenseService {
  /**
   * Create a new ExpenseCategory
   * @method
   * @param {ExpenseCategoryCreationAttributes} expense - ExpenseCategory data
   * @returns {Promise<ExpenseCategory>} - Returns the created ExpenseCategory
   */
  static async create(expense: ExpensesCreationAttributes): Promise<Expense> {
    return Database.Expense.create(expense);
  }

  /**
   * Find all ExpenseCategories
   * @method
   * @returns {Promise<ExpensesAttributes[]>} - Returns all ExpenseCategories
   */
  static async findAll(): Promise<ExpensesAttributes[]> {
    return Database.Expense.findAll({
      include: [{ model: Database.ExpenseCategory, as: 'category' }],
    });
  }

  /**
   * Find ExpenseCategory by id
   * @method
   * @param {number} id - ExpenseCategory id
   * @returns {Promise<ExpensesAttributes | null>} - Returns the found ExpenseCategory or null
   */
  static async findById(id: number): Promise<ExpensesAttributes | null> {
    return Database.Expense.findOne({ where: { id } });
  }

  /**
   * Update an ExpenseCategory
   * @method
   * @param {number} id - ExpenseCategory id
   * @param {ExpensesCreationAttributes} expense - ExpenseCategory data
   * @returns {Promise<ExpensesAttributes | null>} - Returns the updated ExpenseCategory or null
   */
  static async update(
    id: number,
    expense: ExpensesCreationAttributes
  ): Promise<ExpensesAttributes | null> {
    const foundExpense = await Database.Expense.findOne({ where: { id } });
    if (!foundExpense) {
      return null;
    }
    await foundExpense.update(expense);
    return foundExpense;
  }

  /**
   * Delete an ExpenseCategory
   * @method
   * @param {number} id - ExpenseCategory id
   * @returns {Promise<number>} - Returns the number of deleted rows
   */
  static async delete(id: number): Promise<number> {
    return Database.Expense.destroy({ where: { id } });
  }
}

export { ExpenseService };
