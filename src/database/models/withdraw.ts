import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

import { User } from './user';

interface WithdrawAttributes {
  id: string;
  user_id: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface WithdrawCreationAttributes
  extends Optional<
    WithdrawAttributes,
    'id' | 'deletedAt' | 'updatedAt' | 'createdAt'
  > {}

/**
 * Withdraw model
 * @class
 * @see https://sequelize.org/master/manual/models-definition.html
 */
export class Withdraw
  extends Model<WithdrawAttributes, WithdrawCreationAttributes>
  implements WithdrawAttributes
{
  public id!: string;

  public user_id!: string;

  public amount!: number;

  public status!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt!: Date | null;

  public readonly user?: User;

  /**
   * associate the withdraw model with the user model
   * @param {any} models - the sequelize object
   * @returns {void}
   */
  public static associate(models: { User: typeof User }): void {
    Withdraw.belongsTo(models.User, { foreignKey: 'user_id' });
  }

  /**
   * @returns {object} - the withdraw object
   * @memberof Withdraw
   */
  toJSON() {
    return {
      id: this.id,
      user_id: this.user_id,
      amount: this.amount,
      status: this.status,
      user: this.user,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}

const initWithdraw = (sequelize: Sequelize): typeof Withdraw => {
  Withdraw.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
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
      modelName: 'Withdraw',
      tableName: 'withdraws',
      timestamps: true,
      paranoid: true,
    }
  );

  return Withdraw;
};

export default initWithdraw;
