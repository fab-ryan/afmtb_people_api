import { Model, DataTypes, Sequelize } from 'sequelize';

import { User } from './user';

export interface DepositeAttributes {
  id: string;
  source: string;
  description: string;
  userId: string;
  amount: string;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface DepositeCreationAttributes
  extends Omit<
    DepositeAttributes,
    'id' | 'deletedAt' | 'updatedAt' | 'createdAt' | 'status'
  > {}

/**
 * Deposite model
 * @class
 * @see https://sequelize.org/master/manual/models-definition.html
 */
export class Deposit
  extends Model<DepositeAttributes, DepositeCreationAttributes>
  implements DepositeAttributes
{
  public id!: string;

  public source!: string;

  public description!: string;

  public userId!: string;

  public amount!: string;

  public status!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt!: Date | null;

  /**
   * Initialize the model
   * @param {any} models - The models object
   * @returns {void}
   * @static
   * @memberof Deposite
   */
  public static associate(models: { User: typeof User }) {
    Deposit.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  }

  /**
   * return json Objects
   * @returns {object} - The json object
   * @memberof Deposite
   */
  toJSON() {
    return {
      id: this.id,
      source: this.source,
      description: this.description,
      userId: this.userId,
      amount: this.amount,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}

/**
 * Initialize the Deposite model
 * @param {Sequelize} sequelize - The sequelize object
 * @returns {Model} - The Deposite model
 */
const initDeposit = (sequelize: Sequelize): typeof Deposit => {
  Deposit.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      source: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'deposits',
      timestamps: true,
      paranoid: true,
    }
  );

  return Deposit;
};
export default initDeposit;
