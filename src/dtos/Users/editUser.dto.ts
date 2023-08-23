import z from 'zod'
import { USER_ROLES } from '../../models/User';

export interface EditUserInputDTO {
    emailToEdit: string,
    id?: string,
    name?:string,
    email?: string,
    role?: USER_ROLES,
    password?: string,
    token: string
}

export interface EditUsertOutputDTO {
    message: string;
    user: {
        id: string,
        name: string,
        email: string,
        password: string,
        role: USER_ROLES,
        createdAt: string,
        token: string;
    }
}
export const EditUserSchema = z.object({
    emailToEdit: z.string().min(11),
    id: z.string().min(1).optional(),
    name: z.string().min(2).optional(),
    email: z.string().min(11).optional(),
    password: z.string().min(6).optional(),
    role: z.string().min(5).optional(),
    token: z.string().min(1)
}).transform(data => data as EditUserInputDTO)