export enum TransactionType {
  INCOME = "Income",
  EXPENSE = "Expense",
}

export class FinancialRecord {
  constructor(
    public readonly id: string,
    public readonly amount: number,
    public readonly category: string,
    public readonly date: Date,
    public readonly description: string,
    public readonly type: TransactionType,
    public readonly userId: string
  ) {}
}
