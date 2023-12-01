import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { TokenPayload } from '../models/User';

dotenv.config();

export class TokenManager {
    public createToken = (payload: TokenPayload): string => {
        // Adicione este log para verificar se a variável de ambiente JWT_KEY está sendo lida corretamente
        console.log('Chave JWT para criação de token:', process.env.JWT_KEY);

        const token = jwt.sign(
            payload,
            process.env.JWT_KEY as string,
            {
                expiresIn: process.env.JWT_EXPIRES_IN,
            }
        );

        return token;
    }

    public getPayload = (token: string): TokenPayload | null => {
        try {
            const payload = jwt.verify(
                token,
                process.env.JWT_KEY as string
            );

            return payload as TokenPayload;
        } catch (error) {
            return null;
        }
    }
}
