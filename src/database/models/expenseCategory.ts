/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable valid-jsdoc */
import { Model, Optional, DataTypes, Sequelize } from 'sequelize';

import { Expense } from './expense';

export interface ExpenseCategoryAttributes {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ExpenseCategoryCreationAttributes
  extends Optional<
    ExpenseCategoryAttributes,
    'id' | 'deletedAt' | 'updatedAt' | 'createdAt'
  > {}

/**
 * ExpenseCategory model
 * @class
 * @see https://sequelize.org/master/manual/models-definition.html
 * @extends Model
 * @type ExpenseCategory
 */
export class ExpenseCategory
  extends Model<ExpenseCategoryAttributes, ExpenseCategoryCreationAttributes>
  implements ExpenseCategoryAttributes
{
  public id!: string;

  public name!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt!: Date | null;

  /**
   * @param {any} models - the sequelize object
   * @returns {void}
   */
  public static associate(models: { Expense: typeof Expense }): void {
    ExpenseCategory.hasMany(models.Expense, {
      foreignKey: 'category_id',
      as: 'expenses',
    });
  }

  /**
   * @returns {object} - the expense category object
   * @memberof ExpenseCategory
   */
  toJSON() {
    return {
      ...this.get(),
      deletedAt: undefined,
      updatedAt: undefined,
      createdAt: undefined,
    };
  }
}

/**
 * Initialize the expense category model
 * @param {Sequelize} sequelize - the sequelize object
 * @returns {Model} - the expense category model
 */
const ExpenseCategoryModel = (sequelize: Sequelize): typeof ExpenseCategory => {
  ExpenseCategory.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },

      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'expense_categories',
      modelName: 'ExpenseCategory',
      timestamps: true,
      paranoid: true,
    }
  );

  return ExpenseCategory;
};

export default ExpenseCategoryModel;
