import Database, {
  ExpenseCategory,
  ExpenseCategoryCreationAttributes,
  ExpenseCategoryAttributes,
} from '../database';
/**
 * ExpenseCategoryService class
 * @class
 * @classdesc ExpenseCategoryService class to interact with the ExpenseCategory table
 * @static
 * @public
 */
class ExpenseCategoryService {
  /**
   * Create a new ExpenseCategory
   * @method
   * @param {ExpenseCategoryCreationAttributes} expenseCategory - ExpenseCategory data
   * @returns {Promise<ExpenseCategory>} - Returns the created ExpenseCategory
   * @public
   * @static
   */
  static async create(
    expenseCategory: ExpenseCategoryCreationAttributes
  ): Promise<ExpenseCategory> {
    return Database.ExpenseCategory.create(expenseCategory);
  }

  /**
   * Find all ExpenseCategories
   * @method
   * @returns {Promise<ExpenseCategoryAttributes[]>} - Returns all ExpenseCategories
   * @public
   * @static
   */
  static async findAll(): Promise<ExpenseCategoryAttributes[]> {
    return Database.ExpenseCategory.findAll();
  }

  /**
   * Find ExpenseCategory by id
   * @method
   * @param {number} id - ExpenseCategory id
   * @returns {Promise<ExpenseCategoryAttributes | null>} - Returns the found ExpenseCategory or null
   * @public
   * @static
   */
  static async findById(id: number): Promise<ExpenseCategoryAttributes | null> {
    return Database.ExpenseCategory.findByPk(id);
  }

  /**
   * Update an ExpenseCategory
   * @method
   * @param {number} id - ExpenseCategory id
   * @param {ExpenseCategoryCreationAttributes} expenseCategory - ExpenseCategory data
   * @returns {Promise<ExpenseCategoryAttributes | null>} - Returns the updated ExpenseCategory or null
   * @public
   * @static
   */
  static async update(
    id: number,
    expenseCategory: ExpenseCategoryCreationAttributes
  ): Promise<ExpenseCategoryAttributes | null> {
    const foundExpenseCategory = await Database.ExpenseCategory.findByPk(id);
    if (!foundExpenseCategory) {
      return null;
    }

    await foundExpenseCategory.update(expenseCategory);
    return foundExpenseCategory;
  }

  /**
   * Delete an ExpenseCategory
   * @method
   * @param {number} id - ExpenseCategory id
   * @returns {Promise<void>} - Returns a promise
   * @public
   * @static
   */
  static async delete(id: number): Promise<void> {
    await Database.ExpenseCategory.destroy({ where: { id } });
  }
}

export { ExpenseCategoryService };
