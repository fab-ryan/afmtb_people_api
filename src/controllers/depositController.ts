import { Request, Response } from 'express';
import { sendResponse } from '../utils';

import { DepositService } from '../services';

/**
 * DepositController
 * @class
 */
const DepositController = {
  createDeposit: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.user as { id: string };
      const deposit = await DepositService.createDeposit({
        ...req.body,
        user_id: id,
      });
      sendResponse(res, 201, deposit, 'Deposit created');
    } catch (e) {
      const status =
        (e as Error).message === 'Insufficient balance' ? 400 : 500;
      const message =
        (e as Error).message === 'Insufficient balance'
          ? 'Insufficient balance'
          : (e as Error).message;
      sendResponse(res, status, e, message);
    }
  },

  getDeposits: async (req: Request, res: Response): Promise<void> => {
    try {
      const deposits = await DepositService.getDeposits();
      sendResponse(res, 200, deposits, 'Deposits retrieved');
    } catch (e) {
      const { message } = e as Error;
      sendResponse(res, 500, e, message);
    }
  },

  getDeposit: async (req: Request, res: Response): Promise<void> => {
    try {
      const deposit = await DepositService.getDeposit(req.params.id);
      sendResponse(res, 200, deposit, 'Deposit retrieved');
    } catch (e) {
      const { message } = e as Error;
      sendResponse(res, 500, e, message);
    }
  },

  updateDeposit: async (req: Request, res: Response): Promise<void> => {
    try {
      const deposit = await DepositService.updateDeposit(
        req.params.id,
        req.body
      );
      sendResponse(res, 200, deposit, 'Deposit updated');
    } catch (e) {
      const { message } = e as Error;
      sendResponse(res, 500, e, message);
    }
  },

  deleteDeposit: async (req: Request, res: Response): Promise<void> => {
    try {
      await DepositService.deleteDeposit(req.params.id);
      sendResponse(res, 200, null, 'Deposit deleted');
    } catch (e) {
      const { message } = e as Error;
      sendResponse(res, 500, e, message);
    }
  },
};

export { DepositController };
