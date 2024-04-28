import express, { Express } from 'express';
import { config, logger, database } from './config';
import { router } from './routes';
import 'reflect-metadata';

database
  .initialize()
  .then(() => {
    logger.info('Connected to the database');
  })
  .catch(error => {
    logger.error(`Failed to connect to the database: ${error}`);
  });

const port = config.SERVER_PORT;

const app: Express = express();
app.use(express.json());
app.use(router);

export { app, port };
