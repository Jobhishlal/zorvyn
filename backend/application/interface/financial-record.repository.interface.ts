import { FinancialRecord } from "../../domain/entity/financial-record.entity.js";

export interface IFinancialRecordRepository {
  save(record: FinancialRecord): Promise<FinancialRecord>;
  findById(id: string): Promise<FinancialRecord | null>;
  findAll(userId?: string): Promise<FinancialRecord[]>;
  update(id: string, record: Partial<FinancialRecord>): Promise<FinancialRecord | null>;
  delete(id: string): Promise<boolean>;
  getSummary(userId?: string): Promise<{
    totalIncome: number;
    totalExpense: number;
  }>;
  getSummaryByCategory(userId?: string): Promise<{ category: string, amount: number }[]>;
  getMonthlySummary(userId?: string): Promise<{ month: string, income: number, expense: number }[]>;
}
