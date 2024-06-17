import { Model, Optional, DataTypes, Sequelize } from 'sequelize';

import { User } from './user';
import { ExpenseCategory } from './expenseCategory';

export interface ExpensesAttributes {
  id: string;
  amount: number;
  category_id: string;
  user_id: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ExpensesCreationAttributes
  extends Optional<
    ExpensesAttributes,
    'id' | 'deletedAt' | 'updatedAt' | 'createdAt'
  > {}

/**
 * Expense mode
 * @class
 * @see https://sequelize.org/master/manual/models-definition.html
 * @extends Model
 */
export class Expense
  extends Model<ExpensesAttributes, ExpensesCreationAttributes>
  implements ExpensesAttributes
{
  public id!: string;

  public amount!: number;

  public category_id!: string;

  public user_id!: string;

  public comment!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt!: Date | null;

  public readonly category?: ExpenseCategory;

  public readonly user?: User;

  /**
   * Initialize the model
   * @argument {any} models - The models object
   * @returns {void}
   * @static
   * @memberof Expense
   */
  static associate(models: {
    ExpenseCategory: typeof ExpenseCategory;
    User: typeof User;
  }) {
    Expense.belongsTo(models.ExpenseCategory, {
      foreignKey: 'category_id',
      as: 'category',
    });
    Expense.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }

  /**
   * @returns {object} - the expense object
   * @memberof Expense
   */
  toJSON() {
    return {
      ...this.get(),
    };
  }
}

/**
 * Initialize the expense model
 * @param {Sequelize} sequelize - The sequelize object
 * @returns {void}
 */
const ExpensesModel = (sequelize: Sequelize): typeof Expense => {
  Expense.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
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
      tableName: 'expenses',
      modelName: 'Expense',
      timestamps: true,
      paranoid: true,
    }
  );
  return Expense;
};

export default ExpensesModel;
