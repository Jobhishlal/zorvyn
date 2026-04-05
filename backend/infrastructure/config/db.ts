import mongoose from 'mongoose';
import { config } from './index.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('MongoDB Connected successfully');
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  }
};
