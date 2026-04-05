import { FinancialRecord } from "../../domain/entity/financial-record.entity";
import { FinancialRecordResponseDTO } from "../dto/financial-record.dto";

export class FinancialRecordMapper {
  public static toResponseDTO(record: FinancialRecord): FinancialRecordResponseDTO {
    return {
      id: record.id,
      amount: record.amount,
      category: record.category,
      date: record.date.toISOString(),
      description: record.description,
      type: record.type,
      userId: record.userId,
    };
  }

  public static toResponseDTOList(records: FinancialRecord[]): FinancialRecordResponseDTO[] {
    return records.map(record => this.toResponseDTO(record));
  }
}
