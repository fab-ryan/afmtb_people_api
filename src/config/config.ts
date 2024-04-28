import dotenv from 'dotenv';
import { DatabaseType } from 'typeorm';

dotenv.config();

type TConfig = {
  SERVER_PORT: string | number;
  DATABASE: {
    TYPE: DatabaseType;
    HOST: string;
    PORT: number;
    USERNAME: string;
    PASSWORD: string;
    DATABASE: string;
  };
  SECRET: string;
  CLOUDINARY: {
    CLOUD_NAME: string;
    API_KEY: string;
    API_SECRET: string;
  };
};

const config: TConfig = {
  SERVER_PORT: process.env.SERVER_PORT || 3000,
  DATABASE: {
    TYPE: 'postgres' as DatabaseType,
    HOST: process.env.DATABASE_HOST || 'localhost',
    PORT: parseInt(process.env.DATABASE_PORT as string, 10) || 5432,
    USERNAME: process.env.DATABASE_USERNAME || 'root',
    PASSWORD: process.env.DATABASE_PASSWORD || '',
    DATABASE: process.env.DATABASE_NAME || '',
  },
  SECRET: process.env.SECRET || 'secret',
  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUD_NAME || '',
    API_KEY: process.env.API_KEY || '',
    API_SECRET: process.env.API_SECRET || '',
  },
};

export { config };
