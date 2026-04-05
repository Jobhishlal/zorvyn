import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { config } from './infrastructure/config/index.js';
import { connectDB } from './infrastructure/config/db.js';
import userRouter from './presentation/router/user.router.js';
import financialRecordRouter from './presentation/router/financial-record.router.js';
import { RouterPaths } from './infrastructure/constants/index.js';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Database
connectDB();

// Routes
app.use(RouterPaths.USERS, userRouter);
app.use(RouterPaths.TRANSACTIONS, financialRecordRouter);

// Basic health check
app.get('/', (req, res) => {
  res.send('Finance Dashboard API is running');
});

// Start Server
app.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT}`);
});
