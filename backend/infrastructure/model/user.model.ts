import mongoose, { Schema, Document } from 'mongoose';
import { UserRole } from '../../domain/entity/user.entity';

export interface IUserDocument extends Document {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
}

const userSchema = new Schema<IUserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: Object.values(UserRole), required: true, default: UserRole.VIEWER },
}, { timestamps: true });

export const UserModel = mongoose.model<IUserDocument>('User', userSchema);
