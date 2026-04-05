import mongoose, { Schema, Document } from 'mongoose';
import { TransactionType } from '../../domain/entity/financial-record.entity';

export interface IFinancialRecordDocument extends Document {
  amount: number;
  category: string;
  date: Date;
  description: string;
  type: TransactionType;
  userId: string;
}

const financialRecordSchema = new Schema<IFinancialRecordDocument>({
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  description: { type: String },
  type: { type: String, enum: Object.values(TransactionType), required: true },
  userId: { type: String, required: true },
}, { timestamps: true });

export const FinancialRecordModel = mongoose.model<IFinancialRecordDocument>('FinancialRecord', financialRecordSchema);
