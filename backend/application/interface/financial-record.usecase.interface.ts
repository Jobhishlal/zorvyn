import { CreateFinancialRecordDTO, FinancialRecordResponseDTO, DashboardSummaryDTO } from "../dto/financial-record.dto.js";
import { FinancialRecord } from "../../domain/entity/financial-record.entity.js";

export interface ICreateFinancialRecordUseCase {
  execute(data: CreateFinancialRecordDTO): Promise<FinancialRecordResponseDTO>;
}

export interface IGetAllTransactionsUseCase {
  execute(userId?: string): Promise<FinancialRecordResponseDTO[]>;
}

export interface IGetDashboardSummaryUseCase {
  execute(userId?: string): Promise<DashboardSummaryDTO>;
}

export interface IUpdateFinancialRecordUseCase {
  execute(id: string, data: Partial<FinancialRecord>): Promise<FinancialRecordResponseDTO | null>;
}

export interface IDeleteFinancialRecordUseCase {
  execute(id: string): Promise<boolean>;
}
