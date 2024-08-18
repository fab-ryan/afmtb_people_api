import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

import { User } from './user';

export interface WithdrawAttributes {
  id: string;
  userId: string;
  amount: number;
  balanceBefore: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface WithdrawCreationAttributes
  extends Optional<
    WithdrawAttributes,
    'id' | 'deletedAt' | 'updatedAt' | 'createdAt' | 'status' | 'balanceBefore'
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

  public userId!: string;

  public amount!: number;

  public status!: string;

  public balanceBefore!: number;

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
    Withdraw.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }

  /**
   * @returns {object} - the withdraw object
   * @memberof Withdraw
   */
  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      amount: this.amount,
      status: this.status,
      balanceBefore: this.balanceBefore,
      user: this.user,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

const initWithdraw = (sequelize: Sequelize): typeof Withdraw => {
  Withdraw.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      balanceBefore: {
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
    }
  );

  return Withdraw;
};

export default initWithdraw;
