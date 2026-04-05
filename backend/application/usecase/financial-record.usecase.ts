import { FinancialRecord, TransactionType } from "../../domain/entity/financial-record.entity.js";
import { CreateFinancialRecordDTO, FinancialRecordResponseDTO, DashboardSummaryDTO } from "../dto/financial-record.dto.js";
import { IFinancialRecordRepository } from "../interface/financial-record.repository.interface.js";
import { FinancialRecordMapper } from "../mapping/financial-record.mapper.js";

export class CreateFinancialRecordUseCase {
  constructor(private recordRepository: IFinancialRecordRepository) {}

  public async execute(data: CreateFinancialRecordDTO): Promise<FinancialRecordResponseDTO> {
    const newRecord = new FinancialRecord(
      "", 
      data.amount,
      data.category,
      new Date(data.date),
      data.description,
      data.type,
      data.userId
    );
    const savedRecord = await this.recordRepository.save(newRecord);
    return FinancialRecordMapper.toResponseDTO(savedRecord);
  }
}

export class GetAllTransactionsUseCase {
  constructor(private recordRepository: IFinancialRecordRepository) {}

  public async execute(userId?: string): Promise<FinancialRecordResponseDTO[]> {
    const records = await this.recordRepository.findAll(userId);
    return FinancialRecordMapper.toResponseDTOList(records);
  }
}

export class GetDashboardSummaryUseCase {
  constructor(private recordRepository: IFinancialRecordRepository) {}

  public async execute(userId?: string): Promise<DashboardSummaryDTO> {
    const summary = await this.recordRepository.getSummary(userId);
    const categoryReport = await this.recordRepository.getSummaryByCategory(userId);
    const monthlyReport = await this.recordRepository.getMonthlySummary(userId);
    const recentTransactions = await this.recordRepository.findAll(userId); // Simplified
    
    return {
      totalIncome: summary.totalIncome,
      totalExpense: summary.totalExpense,
      netBalance: summary.totalIncome - summary.totalExpense,
      monthlyReport,
      categoryReport,
      recentTransactions: FinancialRecordMapper.toResponseDTOList(recentTransactions.slice(0, 5)),
    };
  }
}

export class UpdateFinancialRecordUseCase {
  constructor(private recordRepository: IFinancialRecordRepository) {}

  public async execute(id: string, data: Partial<FinancialRecord>): Promise<FinancialRecordResponseDTO | null> {
    const updated = await this.recordRepository.update(id, data);
    return updated ? FinancialRecordMapper.toResponseDTO(updated) : null;
  }
}

export class DeleteFinancialRecordUseCase {
  constructor(private recordRepository: IFinancialRecordRepository) {}

  public async execute(id: string): Promise<boolean> {
    return await this.recordRepository.delete(id);
  }
}
