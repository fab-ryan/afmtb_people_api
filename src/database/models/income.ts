/* eslint-disable import/no-extraneous-dependencies */
import { DataTypes, Model, Sequelize } from 'sequelize';

import { User } from './user';

export interface IncomeAttributes {
  id: string;
  user_id: string;
  amount: number;
  balance: number;
  description: string;
  source: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IncomeCreationAttributes
  extends Omit<
    IncomeAttributes,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
  > {}

/**
 * Income model
 * @class
 * @see https://sequelize.org/master/manual/models-definition.html
 */
export class Income
  extends Model<IncomeAttributes, IncomeCreationAttributes>
  implements IncomeAttributes
{
  public id!: string;

  public user_id!: string;

  public amount!: number;

  public balance!: number;

  public description!: string;

  public source!: string;

  public readonly user?: User;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt!: Date | null;

  /**
   * Initialize the model
   * @param {any} models - The models object
   * @returns {void}
   * @static
   * @memberof Income
   */
  public static associate(models: { User: typeof User }) {
    Income.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }

  /**
   * Serialize the income model
   * @returns {object} - The serialized income model
   */
  toJSON() {
    return { ...this.get(), user_id: undefined };
  }
}

/**
 * Initialize the Income model
 * @param {Sequelize} sequelize - The Sequelize instance
 * @returns {Model} - The Income model
 */
function initIncome(sequelize: Sequelize) {
  Income.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      source: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Income',
      tableName: 'incomes',
      timestamps: true,
      paranoid: true,
    }
  );

  return Income;
}
export default initIncome;
