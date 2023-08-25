import { USER_ROLES } from "../models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface TokenPayload {
  id: string;
  role: USER_ROLES;
  name: string;
}

export class TokenMananger {
  public createToken(payload: TokenPayload): string {
    const token = jwt.sign(payload, process.env.JWT_KEY as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  }

  public getPaylod(token: string): TokenPayload | null {
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY as string);
      return payload as TokenPayload;
    } catch (error) {
      return null;
    }
  }
}
