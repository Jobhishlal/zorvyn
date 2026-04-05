import { Request, Response } from 'express';
import { ICreateUserUseCase, IGetAllUsersUseCase, IDeleteUserUseCase } from '../../application/interface/user.usecase.interface.js';
import { ApiStatusCodes, ResponseMessages } from '../../infrastructure/constants/index.js';
import { SecurityService } from '../../infrastructure/security/security.service.js';
import { DIContainer } from '../../infrastructure/config/dependency-injection.js';
import { Validator } from '../../infrastructure/utils/validator.js';

export class UserController {
  private static createUserUseCase: ICreateUserUseCase = DIContainer.createUserUseCase;
  private static getAllUsersUseCase: IGetAllUsersUseCase = DIContainer.getAllUsersUseCase;
  private static deleteUserUseCase: IDeleteUserUseCase = DIContainer.deleteUserUseCase;

  public static async register(req: Request, res: Response): Promise<any> {
    try {
      const { name, email, password, role } = req.body;

      if (!Validator.isNotEmpty(name) || !Validator.isNotEmpty(email) || !Validator.isNotEmpty(password) || !Validator.isNotEmpty(role)) {
        return res.status(ApiStatusCodes.BAD_REQUEST).json({ message: ResponseMessages.MISSING_FIELDS });
      }

      if (!Validator.isEmail(email)) {
        return res.status(ApiStatusCodes.BAD_REQUEST).json({ message: ResponseMessages.INVALID_INPUT + ": Invalid email format" });
      }

      const hashedPassword = await SecurityService.hashPassword(password);
      const user = await UserController.createUserUseCase.execute({ name, email, password: hashedPassword, role });
      return res.status(ApiStatusCodes.CREATED).json({ message: ResponseMessages.CREATED, data: user });
    } catch (e: any) {
      return res.status(ApiStatusCodes.BAD_REQUEST).json({ message: e.message || ResponseMessages.INTERNAL_SERVER_ERROR });
    }
  }

  public static async login(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = req.body;

      if (!Validator.isNotEmpty(email) || !Validator.isNotEmpty(password)) {
        return res.status(ApiStatusCodes.BAD_REQUEST).json({ message: ResponseMessages.MISSING_FIELDS });
      }

      const user = await DIContainer.userRepository.findByEmail(email);
      if (!user || !(await SecurityService.comparePassword(password, user.password || ""))) {
        return res.status(ApiStatusCodes.UNAUTHORIZED).json({ message: ResponseMessages.INVALID_CREDENTIALS });
      }

      const token = SecurityService.generateToken({ id: user.id, role: user.role });
      res.cookie('token', token, { httpOnly: true });
      return res.status(ApiStatusCodes.SUCCESS).json({
        message: ResponseMessages.SUCCESS,
        data: { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } }
      });
    } catch (e: any) {
      return res.status(ApiStatusCodes.INTERNAL_SERVER_ERROR).json({ message: ResponseMessages.INTERNAL_SERVER_ERROR });
    }
  }

  public static async getAllUsers(req: Request, res: Response): Promise<any> {
    try {
      const users = await UserController.getAllUsersUseCase.execute();
      return res.status(ApiStatusCodes.SUCCESS).json({ message: ResponseMessages.SUCCESS, data: users });
    } catch (e: any) {
      return res.status(ApiStatusCodes.INTERNAL_SERVER_ERROR).json({ message: ResponseMessages.INTERNAL_SERVER_ERROR });
    }
  }

  public static async deleteUser(req: Request, res: Response): Promise<any> {
    try {
      const success = await UserController.deleteUserUseCase.execute(req.params.id as any as string);
      return res.status(ApiStatusCodes.SUCCESS).json({ message: ResponseMessages.SUCCESS, success });
    } catch (e: any) {
      return res.status(ApiStatusCodes.INTERNAL_SERVER_ERROR).json({ message: ResponseMessages.INTERNAL_SERVER_ERROR });
    }
  }
}
