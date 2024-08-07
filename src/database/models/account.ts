/* eslint-disable import/no-extraneous-dependencies */
import { Model, DataTypes, Sequelize } from 'sequelize';
import { User } from './user';

export interface AccountAttributes {
  id: number;
  user_id: string;
  account_number: string;
  bank_name: string;
  bank_branch: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
export interface AccountCreationAttributes
  extends Omit<
    AccountAttributes,
    'id' | 'deletedAt' | 'updatedAt' | 'createdAt'
  > {}

/**
 * Account model
 * @class
 * @see https://sequelize.org/master/manual/models-definition.html
 */
export class Account
  extends Model<AccountAttributes, AccountCreationAttributes>
  implements AccountAttributes
{
  public id!: number;

  public user_id!: string;

  public account_number!: string;

  public bank_name!: string;

  public bank_branch!: string;

  public balance!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt!: Date | null;

  /**
   * Initialize the model
   * @param {any} models - The models object
   * @returns {void}
   * @static
   * @memberof Account
   */
  public static associate(models: { User: typeof User }) {
    Account.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }

  /**
   *
   * @returns {void}
   */
  toJSON() {
    return { ...this.get(), id: undefined, user_id: undefined };
  }
}

/**
 * Initialize the Account model
 * @param {Sequelize} sequelize - The Sequelize instance
 * @returns {Model} - The Account model
 */
function AccountModal(sequelize: Sequelize) {
  Account.init(
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
      account_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bank_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bank_branch: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL,
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
      modelName: 'account',
      paranoid: true,
      tableName: 'accounts',
      timestamps: true,
    }
  );

  return Account;
}

export default AccountModal;
