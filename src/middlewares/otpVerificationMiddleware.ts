import { Request, Response, NextFunction } from 'express';
import { sendResponse, verifyToken } from '../utils';

type Payload = {
  id: string;
  iat: number;
  exp: number;
  otp: string;
};

const checkExpiry = (payload: Payload) => {
  // add 15 minutes to the current time
  const now = Date.now() + 15 * 60 * 1000;

  if (payload.exp < now) {
    return false;
  }
  return true;
};

/**
 * The OTP verification middleware.
 * @param req The request object.
 * @param res The response object.
 * @param next The next function.
 * @returns {Promise<void>} A promise that resolves void.
 */

export const otpVerificationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;
  if (!auth) {
    sendResponse(res, 401, null, 'Unauthorized');
  }
  const token = auth?.split(' ')[1];
  if (token) {
    sendResponse(res, 401, null, 'Unauthorized');
  }
  const payload = verifyToken(token as string) as Payload;

  if (!payload) {
    sendResponse(res, 401, null, 'Unauthorized');
  }
  const isExpired = checkExpiry(payload);
  if (!isExpired) {
    sendResponse(res, 401, null, 'OTP expired');
  }
  req.user = payload;
  next();
};
