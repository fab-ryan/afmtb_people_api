/* eslint-disable import/no-extraneous-dependencies */
import express, { Express } from 'express';
import passport from 'passport';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config';
import { router } from './routes';
import 'reflect-metadata';
import { passportStrategy } from './strategy';

const port = config.SERVER_PORT;

const app: Express = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(router);
app.use(passport.initialize());
passportStrategy(passport);

export { app, port };
