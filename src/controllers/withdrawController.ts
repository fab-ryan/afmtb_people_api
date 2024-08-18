/* eslint-disable require-jsdoc */
import { Request, Response } from 'express';
import { WithdrawService } from '../services';
import { sendResponse } from '../utils';
import { WithdrawCreationAttributes } from '../database';

interface UserRequest extends Request {
  body: WithdrawCreationAttributes;
}

const createWithdraw = async (
  req: UserRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.user as { id: string };
    const withdraw = await WithdrawService.createWithdraw({
      ...req.body,
      status: 'completed',
      userId: id,
    });
    sendResponse(res, 201, withdraw, 'Withdraw created');
  } catch (e) {
    const status = (e as Error).message === 'Insufficient balance' ? 400 : 500;
    const message =
      (e as Error).message === 'Insufficient balance'
        ? 'Insufficient balance'
        : (e as Error).message;
    sendResponse(res, status, e, message);
  }
};

const getWithdraws = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.user as { id: string };
    const withdraws = await WithdrawService.getWithdraws(id);
    sendResponse(res, 200, withdraws, 'Withdraws retrieved');
  } catch (e) {
    const { message } = e as Error;
    sendResponse(res, 500, e, message);
  }
};

const getWithdraw = async (req: Request, res: Response): Promise<void> => {
  try {
    const withdraw = await WithdrawService.getWithdraw(req.params.id);
    sendResponse(res, 200, withdraw, 'Withdraw retrieved');
  } catch (e) {
    const { message } = e as Error;
    sendResponse(res, 500, e, message);
  }
};

const updateWithdraw = async (req: Request, res: Response): Promise<void> => {
  try {
    const withdraw = await WithdrawService.updateWithdraw(
      req.params.id,
      req.body
    );
    sendResponse(res, 200, withdraw, 'Withdraw updated');
  } catch (e) {
    const { message } = e as Error;
    sendResponse(res, 500, e, message);
  }
};

const WithdrawController = {
  createWithdraw,
  getWithdraws,
  getWithdraw,
  updateWithdraw,
};

export { WithdrawController };
