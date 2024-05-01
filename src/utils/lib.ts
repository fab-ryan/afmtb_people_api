/* eslint-disable import/no-extraneous-dependencies */
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { config, logger } from '../config';
import { cloudinary } from './cloudinary';

export const generateToken = (payload: Record<string, unknown>): string => {
  return jwt.sign(payload, config.SECRET as string, {
    expiresIn: '1d',
  });
};

export const fileUpload = async (req: Request, folder = 'mobile') => {
  logger.info('Uploading to cloudinary', { label: 'fileUpload' });
  try {
    const { file } = req;
    const buffer = file?.buffer || Buffer.from('');
    const tempFilePath = path.join(os.tmpdir(), file?.originalname || '');

    fs.writeFile(tempFilePath, buffer, err => {
      if (err) {
        logger.error('Error writing file to temp folder', {
          label: 'fileUpload',
        });
        throw new Error('Error writing file to temp folder');
      }
    });

    const response = await cloudinary.v2.uploader.upload(tempFilePath, {
      folder,
    });
    fs.unlink(tempFilePath, err => {
      if (err) {
        logger.error('Error deleting file from temp folder', {
          label: 'fileUpload',
        });
        throw new Error('Error deleting file from temp folder');
      }
    });
    return response.secure_url;
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    logger.error(errorMessage, { label: 'fileUpload' });
    throw new Error(`Error uploading to cloudinary', ${errorMessage}`);
  }
};

export const generateAccountNumber = (): string => {
  const min = 100000000000;
  const max = 999999999999;
  return `BK-${Math.floor(Math.random() * (max - min + 1) + min).toString()}`;
};
