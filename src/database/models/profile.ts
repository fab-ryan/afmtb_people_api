/* eslint-disable import/no-extraneous-dependencies */
import { Model, DataTypes, Sequelize } from 'sequelize';
import { User } from './user';

export interface ProfileAttributes {
  id: string;
  user_id: string;
  avatar: string;
  address: string;
  country: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ProfileCreationAttributes
  extends Omit<ProfileAttributes, 'id'> {}

/**
 * Profile model
 * @class
 * @see https://sequelize.org/master/manual/models-definition.html
 */
export class Profile
  extends Model<ProfileAttributes, ProfileCreationAttributes>
  implements ProfileAttributes
{
  public id!: string;

  public user_id!: string;

  public avatar!: string;

  public address!: string;

  public country!: string;

  public bio!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt!: Date | null;

  /**
   * Initialize the model
   * @param {any} models - The models object
   * @returns {void}
   * @static
   * @memberof Profile
   */
  public static associate(models: { User: typeof User }) {
    Profile.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }

  /**
   * Initialize the profile model
   * @param {Sequelize} sequelize - The Sequelize instance
   * @returns {void}
   * @static
   * @memberof Profile
   */
  toJSON() {
    return { ...this.get() };
  }
}

/**
 * Initialize the profile model
 * @param {Sequelize} sequelize - The Sequelize instance
 * @returns {void}
 */
function ProfileModal(sequelize: Sequelize) {
  Profile.init(
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
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Profile',
      tableName: 'users_profile',
      paranoid: true,
    }
  );

  return Profile;
}

export default ProfileModal;
