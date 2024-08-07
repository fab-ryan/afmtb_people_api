import { Request, Response } from 'express';
import { sendResponse } from '../utils';
import { DashboardService } from '../services';

const dashboardCounts = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as { id: string };
    const stats = await DashboardService.getDashboardData(id);
    return sendResponse(res, 200, stats, 'All Statistics');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, error, message);
  }
};

const DashboardController = {
  dashboardCounts,
};

export { DashboardController };
