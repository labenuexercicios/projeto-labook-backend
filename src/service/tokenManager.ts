import jwt from "jsonwebtoken";
import { USER_ROLES } from "../models/User";
import dotenv from "dotenv";

dotenv.config();

export interface TokenPayLoad {
  id: string;
  name: string;
  role: USER_ROLES;
}

export class TokenManager {
  public createToken = (payload: TokenPayLoad): string => {
    const token = jwt.sign(payload, process.env.JWT_KEY as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  };

  public getPayload = (token: string): TokenPayLoad | null => {
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY as string);
      return payload as TokenPayLoad;
    } catch (error) {
      return null;
    }
  };
}