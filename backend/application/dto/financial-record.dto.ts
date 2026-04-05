import { TransactionType } from "../../domain/entity/financial-record.entity";

export interface CreateFinancialRecordDTO {
  amount: number;
  category: string;
  date: string;
  description: string;
  type: TransactionType;
  userId: string;
}

export interface FinancialRecordResponseDTO {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
  type: TransactionType;
  userId: string;
}

export interface DashboardSummaryDTO {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  monthlyReport: { month: string; income: number; expense: number }[];
  categoryReport: { category: string; amount: number }[];
  recentTransactions: FinancialRecordResponseDTO[];
}
