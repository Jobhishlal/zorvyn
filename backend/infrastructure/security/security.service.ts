import bcrypt from 'bcryptjs';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { config } from '../config/index.js';

export class SecurityService {
  public static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  public static async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  public static generateToken(payload: any): string {
    return jwt.sign(payload as object, config.JWT_SECRET as Secret, { 
      expiresIn: config.JWT_EXPIRES_IN as any 
    });
  }

  public static verifyToken(token: string): any {
    try {
      return jwt.verify(token, config.JWT_SECRET as Secret);
    } catch (e) {
      return null;
    }
  }
}
