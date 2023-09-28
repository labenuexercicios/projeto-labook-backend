import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { USER_ROLES } from '../models/User'

dotenv.config()

export interface TokenPayload {
    id: string,
    role: USER_ROLES,
    name: string
}


export class TokenManager {
    public createToken(payload: TokenPayload): string {
        const token = jwt.sign(
            payload,
            process.env.JWT_KEY as string,
            {
                expiresIn: process.env.JWT_EXPIRES_IN as string
            }
        )
        return token
    }

    public getPayload(token: string): TokenPayload | null {
        try {
            const payload = jwt.verify(token, process.env.JWT_KEY as string)
            return payload as TokenPayload
        } catch (error) {
            return null
        }
    }
}