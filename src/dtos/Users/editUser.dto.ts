import z from 'zod'
import { USER_ROLES } from '../../models/User';

export interface EditUserInputDTO {
    idToEdit: string,
    name?:string,
    email?: string,
    password?: string,
    token: string
}

export interface EditUsertOutputDTO {
        message: string,
        name: string,
        email: string,
        password: string,
        role: USER_ROLES
}

export const EditUserSchema = z.object({
    idToEdit: z.string().min(1),
    name: z.string().min(2).optional(),
    email: z.string().min(11).optional(),
    password: z.string().min(6).optional(),
    role: z.string().min(5).optional(),
    token: z.string().min(1)
}).transform(data => data as EditUserInputDTO)