import { Request, Response } from 'express';
import { ICreateFinancialRecordUseCase, IGetAllTransactionsUseCase, IGetDashboardSummaryUseCase, IUpdateFinancialRecordUseCase, IDeleteFinancialRecordUseCase } from '../../application/interface/financial-record.usecase.interface.js';
import { ApiStatusCodes, ResponseMessages } from '../../infrastructure/constants/index.js';
import { AuthRequest } from '../../infrastructure/security/middleware.js';
import { DIContainer } from '../../infrastructure/config/dependency-injection.js';
import { Validator } from '../../infrastructure/utils/validator.js';
import { UserRole } from '../../domain/entity/user.entity.js';

export class FinancialRecordController {
  private static createUseCase: ICreateFinancialRecordUseCase = DIContainer.createFinancialRecordUseCase;
  private static getAllUseCase: IGetAllTransactionsUseCase = DIContainer.getAllTransactionsUseCase;
  private static getDashboardUseCase: IGetDashboardSummaryUseCase = DIContainer.getDashboardSummaryUseCase;
  private static updateUseCase: IUpdateFinancialRecordUseCase = DIContainer.updateFinancialRecordUseCase;
  private static deleteUseCase: IDeleteFinancialRecordUseCase = DIContainer.deleteFinancialRecordUseCase;

  public static async create(req: AuthRequest, res: Response): Promise<any> {
    try {
      const { amount, category, date, type } = req.body;

      if (!Validator.isNotEmpty(amount) || !Validator.isNotEmpty(category) || !Validator.isNotEmpty(date) || !Validator.isNotEmpty(type)) {
        return res.status(ApiStatusCodes.BAD_REQUEST).json({ message: ResponseMessages.MISSING_FIELDS });
      }

      if (!Validator.isNumber(amount) || amount <= 0) {
        return res.status(ApiStatusCodes.BAD_REQUEST).json({ message: ResponseMessages.INVALID_INPUT + ": Amount must be a positive number" });
      }

      if (!Validator.isValidDate(date)) {
        return res.status(ApiStatusCodes.BAD_REQUEST).json({ message: ResponseMessages.INVALID_INPUT + ": Invalid date format" });
      }

      const data = { ...req.body, userId: req.user?.id };
      const result = await FinancialRecordController.createUseCase.execute(data);
      return res.status(ApiStatusCodes.CREATED).json({ message: ResponseMessages.CREATED, data: result });
    } catch (e: any) {
      return res.status(ApiStatusCodes.BAD_REQUEST).json({ message: e.message || ResponseMessages.INTERNAL_SERVER_ERROR });
    }
  }

  public static async getAll(req: AuthRequest, res: Response): Promise<any> {
    try {
      const userId = req.user?.role === UserRole.ADMIN ? undefined : req.user?.id;
      const records = await FinancialRecordController.getAllUseCase.execute(userId);
      return res.status(ApiStatusCodes.SUCCESS).json({ message: ResponseMessages.SUCCESS, data: records });
    } catch (e: any) {
      return res.status(ApiStatusCodes.INTERNAL_SERVER_ERROR).json({ message: ResponseMessages.INTERNAL_SERVER_ERROR });
    }
  }

  public static async getSummary(req: AuthRequest, res: Response): Promise<any> {
    try {
      const userId = req.user?.role === UserRole.ADMIN ? undefined : req.user?.id;
      const summary = await FinancialRecordController.getDashboardUseCase.execute(userId);
      return res.status(ApiStatusCodes.SUCCESS).json({ message: ResponseMessages.SUCCESS, data: summary });
    } catch (e: any) {
      return res.status(ApiStatusCodes.INTERNAL_SERVER_ERROR).json({ message: ResponseMessages.INTERNAL_SERVER_ERROR });
    }
  }

  public static async update(req: AuthRequest, res: Response): Promise<any> {
    try {
      const { amount, date } = req.body;

      if (amount !== undefined && (!Validator.isNumber(amount) || amount <= 0)) {
        return res.status(ApiStatusCodes.BAD_REQUEST).json({ message: ResponseMessages.INVALID_INPUT + ": Amount must be a positive number" });
      }

      if (date !== undefined && !Validator.isValidDate(date)) {
        return res.status(ApiStatusCodes.BAD_REQUEST).json({ message: ResponseMessages.INVALID_INPUT + ": Invalid date format" });
      }

      const result = await FinancialRecordController.updateUseCase.execute(req.params.id as string, req.body);
      return res.status(ApiStatusCodes.SUCCESS).json({ message: ResponseMessages.SUCCESS, data: result });
    } catch (e: any) {
      return res.status(ApiStatusCodes.INTERNAL_SERVER_ERROR).json({ message: ResponseMessages.INTERNAL_SERVER_ERROR });
    }
  }

  public static async delete(req: AuthRequest, res: Response): Promise<any> {
    try {
      const success = await FinancialRecordController.deleteUseCase.execute(req.params.id as string);
      return res.status(ApiStatusCodes.SUCCESS).json({ message: ResponseMessages.SUCCESS, success });
    } catch (e: any) {
      return res.status(ApiStatusCodes.INTERNAL_SERVER_ERROR).json({ message: ResponseMessages.INTERNAL_SERVER_ERROR });
    }
  }
}
