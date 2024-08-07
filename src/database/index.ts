/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import { Sequelize } from 'sequelize';
import Modals from './models';
import getDatabaseConfig from '../config/db_config';
import { logger } from '../config';

export * from './models';

interface DatabaseConfigInterface {
  database: string;
  username: string;
  password: string;
  host: string;
  port: string;
  dialect: string;
  secret: string;
  dialectOptions?: {
    ssl: {
      require: boolean;
      rejectUnauthorized: boolean;
    };
  };
}

const { username, database, password, host, dialectOptions } =
  getDatabaseConfig() as DatabaseConfigInterface;
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'postgres',
  logging: (msg: string) => logger.debug(msg.replace(/[\n\t\r]/g, '')),

  ...(dialectOptions ? { dialectOptions } : {}),
});

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
  })
  .catch((err: Error) => {
    logger.error('Unable to connect to the database:', err);
  });

const modals = Modals(sequelize);

Object.values(modals).forEach(modal => {
  if (modal.associate) {
    modal.associate(modals);
  }
});

const Database = { sequelize, ...modals };
export default Database;
