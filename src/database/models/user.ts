/* eslint-disable import/no-extraneous-dependencies */
import { Model, DataTypes, Sequelize } from 'sequelize';
import { Profile } from './profile';
import { Account } from './account';
import { Income } from './income';

export interface UserAttributes {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
  role: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface UserCreationAttributes
  extends Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

/**
 * User model
 * @class
 * @see https://sequelize.org/master/manual/models-definition.html
 * @see https://sequelize.org/master/manual/validations-and-constraints.html
 * @see https://sequelize.org/master/manual/hooks.html
 */
export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;

  public first_name!: string;

  public last_name!: string;

  public phone!: string;

  public email!: string;

  public password!: string;

  public role!: string;

  public status!: string;

  public readonly profile?: Profile;

  public readonly account?: Account;

  public readonly income?: Income;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt!: Date | null;

  /**
   * Initialize the model
   * @param {any} models - The models object
   * @returns {void}
   */
  public static associate({
    Profile: profile,
    Account: account,
    Income: income,
  }: {
    Profile: typeof Profile;
    Account: typeof Account;
    Income: typeof Income;
  }) {
    User.hasOne(profile, {
      foreignKey: 'user_id',
      as: 'profile',
    });
    User.hasOne(account, {
      foreignKey: 'user_id',
      as: 'account',
    });
    User.hasMany(income, {
      foreignKey: 'user_id',
      as: 'income',
    });
  }

  /**
   *
   * @returns {void}
   */
  toJSON() {
    return { ...this.get(), password: undefined, deletedAt: undefined };
  }
}

/**
 * User model init function
 * @param {Sequelize} sequelize - The Sequelize instance
 * @returns {Model} - The User model
 */
function UserModal(sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      role: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: 'user',
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active',
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdAt: '',
      updatedAt: '',
    },
    {
      sequelize,
      modelName: 'User',
      paranoid: true,
      timestamps: true,
      tableName: 'users',
    }
  );

  return User;
}

export default UserModal;
