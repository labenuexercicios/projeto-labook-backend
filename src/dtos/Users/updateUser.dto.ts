import z from 'zod'
import { CreateUserInputDTO } from './createUser.dto'

export interface UpdateUserInputDTO {
    idToEdit: string,
    id: string,
    name: string,
    email: string,
    password: string,
    role: string
}

export interface UpdateUserOutputDTO {
    message: string,
    user: {
        id: string,
        name: string,
        email: string,
        password: string,
        role: string,
        createdAt: string
    }
}

export const UpdateUserSchema = z.object({
    idToEdit: z.string().min(1),
    id: z.string().min(1).optional(),
    name: z.string().min(2).optional(),
    password: z.string().min(8).optional(),
    role: z.string().optional()
}).transform(data => data as UpdateUserInputDTO)