import { Router } from 'express';
import { UserController } from '../controller/user.controller';
import { authenticate, authorize } from '../../infrastructure/security/middleware';
import { UserRole } from '../../domain/entity/user.entity';

const userRouter = Router();

userRouter.post('/register', UserController.register);
userRouter.post('/login', UserController.login);
userRouter.get('/', authenticate, authorize([UserRole.ADMIN]), UserController.getAllUsers);
userRouter.delete('/:id', authenticate, authorize([UserRole.ADMIN]), UserController.deleteUser);

export default userRouter;
