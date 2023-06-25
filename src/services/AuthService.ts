import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TokenPayload, USER_ROLES } from '../types';

const saltRounds = 10;
const jwtSecret = 'your-jwt-secret';

class AuthService {
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  static async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, jwtSecret, { expiresIn: '1d' });
  }

  static decodeToken(token: string): TokenPayload | null {
    try {
      const decoded = jwt.verify(token, jwtSecret) as TokenPayload;
      return decoded;
    } catch (error) {
      return null;
    }
  }
  
  static getRoleFromToken(token: string): USER_ROLES | null {
    const decoded = this.decodeToken(token);
    return decoded?.role || null;
  }
}

export default AuthService;
