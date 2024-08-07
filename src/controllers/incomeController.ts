import { Request, Response } from 'express';
import { IncomeService, UserService, AccountService } from '../services';
import { sendResponse } from '../utils';
import { CreateIncomeRequest } from '../types';

interface IncomeRequest extends Request {
  body: CreateIncomeRequest;
}

const createIncome = async (
  req: IncomeRequest,
  res: Response
): Promise<void> => {
  try {
    const userdDetail = req.user as { id: string };
    const user = await UserService.getUserById(userdDetail.id as string);
    if (!user) {
      sendResponse(res, 404, null, 'User not found');
      return;
    }
    const balance = await IncomeService.getAccountBalanceService(user);
    const { amount } = req.body;
    if (balance + parseInt(amount.toString(), 10) < 0) {
      sendResponse(res, 400, null, 'Insufficient balance');
      return;
    }

    req.body.balance = balance + parseInt(amount.toString(), 10);
    const income = await IncomeService.createIncomeService(user, req.body);
    if (!income) {
      sendResponse(res, 400, null, 'Failed to create income');
      return;
    }
    await AccountService.updateBalance(
      userdDetail.id as string,
      parseInt(amount.toString(), 10)
    );
    sendResponse(res, 201, { income }, 'Income created successfully');
  } catch (error) {
    const message = (error as Error).message || 'Failed to create income';
    sendResponse(res, 400, null, message);
  }
};

const getAccountIncome = async (req: Request, res: Response): Promise<void> => {
  try {
    const userDetail = req.user as { id: string };
    const user = await UserService.getUserById(userDetail.id as string);
    if (!user) {
      sendResponse(res, 404, null, 'User not found');
      return;
    }
    const incomes = await IncomeService.getAllIncomes(user);
    sendResponse(res, 200, { incomes }, 'Incomes retrieved successfully');
  } catch (error) {
    const message = (error as Error).message || 'Failed to retrieve incomes';
    sendResponse(res, 400, null, message);
  }
};

export const incomeController = {
  createIncome,
  getAccountIncome,
};
