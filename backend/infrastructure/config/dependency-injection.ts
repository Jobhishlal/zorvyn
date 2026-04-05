import { MongoUserRepository } from "../repository/user.repository.mongo";
import { MongoFinancialRecordRepository } from "../repository/financial-record.repository.mongo";
import { CreateUserUseCase, GetAllUsersUseCase, DeleteUserUseCase } from "../../application/usecase/user.usecase";
import { CreateFinancialRecordUseCase, GetAllTransactionsUseCase, GetDashboardSummaryUseCase, UpdateFinancialRecordUseCase, DeleteFinancialRecordUseCase } from "../../application/usecase/financial-record.usecase";

// Repositories
const userRepository = new MongoUserRepository();
const financialRecordRepository = new MongoFinancialRecordRepository();

// User Use Cases
const createUserUseCase = new CreateUserUseCase(userRepository);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);

// Financial Record Use Cases
const createFinancialRecordUseCase = new CreateFinancialRecordUseCase(financialRecordRepository);
const getAllTransactionsUseCase = new GetAllTransactionsUseCase(financialRecordRepository);
const getDashboardSummaryUseCase = new GetDashboardSummaryUseCase(financialRecordRepository);
const updateFinancialRecordUseCase = new UpdateFinancialRecordUseCase(financialRecordRepository);
const deleteFinancialRecordUseCase = new DeleteFinancialRecordUseCase(financialRecordRepository);

export const DIContainer = {
  userRepository,
  financialRecordRepository,
  createUserUseCase,
  getAllUsersUseCase,
  deleteUserUseCase,
  createFinancialRecordUseCase,
  getAllTransactionsUseCase,
  getDashboardSummaryUseCase,
  updateFinancialRecordUseCase,
  deleteFinancialRecordUseCase,
};
