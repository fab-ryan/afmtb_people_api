/* eslint-disable import/no-extraneous-dependencies */
import passport from 'passport';
import { NextFunction, Response, Request } from 'express';
import { sendResponse } from '../utils';
import { User } from '../database';

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    'jwt',
    { session: false },
    async (error: unknown, user: User | null) => {
      if (error || !user) {
        return sendResponse(res, 401, null, 'Unauthorized');
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || (req.user as User).role !== 'admin') {
    return sendResponse(res, 403, null, 'Forbidden');
  }
  next();
};
