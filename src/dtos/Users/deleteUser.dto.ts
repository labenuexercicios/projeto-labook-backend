import z from 'zod'
import { USER_ROLES } from '../../models/User';

export interface DeleteUserInputDTO {
    emailToDelete: string,
    token: string
}

export interface DeleteUserOutputDTO {
    message: string;
    user: {
        id: string,
        name: string,
        email: string,
        password: string,
        role: USER_ROLES,
        createdAt: string,
    }
}
export const DeleteUserSchema = z.object({
    emailToDelete: z.string().min(11),
    token: z.string().min(1)
}).transform(data => data as DeleteUserInputDTO)