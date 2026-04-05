import { FinancialRecord, TransactionType } from "../../domain/entity/financial-record.entity.js";
import { IFinancialRecordRepository } from "../../application/interface/financial-record.repository.interface.js";
import { FinancialRecordModel } from "../model/financial-record.model.js";

export class MongoFinancialRecordRepository implements IFinancialRecordRepository {
  public async save(record: FinancialRecord): Promise<FinancialRecord> {
    const createdRecord = await FinancialRecordModel.create({
      amount: record.amount,
      category: record.category,
      date: record.date,
      description: record.description,
      type: record.type,
      userId: record.userId,
    });
    return new FinancialRecord(
      createdRecord._id.toString(),
      createdRecord.amount,
      createdRecord.category,
      createdRecord.date,
      createdRecord.description,
      createdRecord.type,
      createdRecord.userId
    );
  }

  public async findById(id: string): Promise<FinancialRecord | null> {
    const doc = await FinancialRecordModel.findById(id);
    if (!doc) return null;
    return new FinancialRecord(
      doc._id.toString(),
      doc.amount,
      doc.category,
      doc.date,
      doc.description,
      doc.type,
      doc.userId
    );
  }

  public async findAll(userId?: string): Promise<FinancialRecord[]> {
    const query = userId ? { userId } : {};
    const docs = await FinancialRecordModel.find(query).sort({ date: -1 });
    return (docs as any[]).map((doc: any) => new FinancialRecord(
      doc._id.toString(),
      doc.amount,
      doc.category,
      doc.date,
      doc.description,
      doc.type,
      doc.userId
    ));
  }

  public async update(id: string, record: Partial<FinancialRecord>): Promise<FinancialRecord | null> {
    const updated = await FinancialRecordModel.findByIdAndUpdate(id, record, { new: true });
    if (!updated) return null;
    return new FinancialRecord(
      updated._id.toString(),
      updated.amount,
      updated.category,
      updated.date,
      updated.description,
      updated.type,
      updated.userId
    );
  }

  public async delete(id: string): Promise<boolean> {
    const result = await FinancialRecordModel.findByIdAndDelete(id);
    return !!result;
  }

  public async getSummary(userId?: string): Promise<{ totalIncome: number; totalExpense: number }> {
    const query = userId ? { userId } : {};
    const pipeline = [
      { $match: query },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" }
        }
      }
    ];
    const results = await FinancialRecordModel.aggregate(pipeline);
    const summary = { totalIncome: 0, totalExpense: 0 };
    results.forEach((res: any) => {
      if (res._id === TransactionType.INCOME) summary.totalIncome = res.total;
      if (res._id === TransactionType.EXPENSE) summary.totalExpense = res.total;
    });
    return summary;
  }

  public async getSummaryByCategory(userId?: string): Promise<{ category: string, amount: number }[]> {
    const query = userId ? { userId } : {};
    const pipeline = [
      { $match: query },
      {
        $group: {
          _id: "$category",
          amount: { $sum: "$amount" }
        }
      },
      { $project: { _id: 0, category: "$_id", amount: 1 } }
    ];
    return await FinancialRecordModel.aggregate(pipeline);
  }

  public async getMonthlySummary(userId?: string): Promise<{ month: string, income: number, expense: number }[]> {
    const query = userId ? { userId } : {};
    const pipeline = [
      { $match: query },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
          income: { $sum: { $cond: [{ $eq: ["$type", TransactionType.INCOME] }, "$amount", 0] } },
          expense: { $sum: { $cond: [{ $eq: ["$type", TransactionType.EXPENSE] }, "$amount", 0] } }
        }
      },
      { $project: { _id: 0, month: "$_id", income: 1, expense: 1 } },
      { $sort: { month: 1 } } as any
    ];
    return await FinancialRecordModel.aggregate(pipeline);
  }
}
