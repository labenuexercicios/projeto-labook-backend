import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { USER_ROLES } from '../models/modelUser'

dotenv.config()


export interface tokenPayload {
    id: string,
    name: string,
    role: USER_ROLES
}

export class tokenManager {

    public createToken = (payload: tokenPayload): string => {
        const token = jwt.sign(
            payload,
            process.env.JWT_KEY as string,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        )

        return token
    }

    public getPayload = (token: string): tokenPayload | null => {
        try {
            const payload = jwt.verify(
                token,
                process.env.JWT_KEY as string
            )

            return payload as tokenPayload

        } catch (error) {
            return null
        }
    }
}