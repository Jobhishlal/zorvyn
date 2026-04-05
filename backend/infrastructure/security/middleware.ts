import { Request, Response, NextFunction } from 'express';
import { SecurityService } from './security.service.js';
import { UserRole } from '../../domain/entity/user.entity.js';
import { ApiStatusCodes, ResponseMessages } from '../constants/index.js';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: UserRole;
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): any => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(ApiStatusCodes.UNAUTHORIZED).json({ message: "Unauthorized: No token provided" });
  }

  const decoded = SecurityService.verifyToken(token);
  if (!decoded) {
    return res.status(ApiStatusCodes.UNAUTHORIZED).json({ message: "Unauthorized: Invalid token" });
  }

  req.user = decoded;
  next();
};

export const authorize = (roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): any => {
    if (!req.user) {
      return res.status(ApiStatusCodes.UNAUTHORIZED).json({ message: ResponseMessages.UNAUTHORIZED });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(ApiStatusCodes.FORBIDDEN).json({ message: ResponseMessages.FORBIDDEN });
    }

    next();
  };
};
