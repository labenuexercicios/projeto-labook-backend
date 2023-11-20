import z from 'zod'
import { User, UserModel } from '../../models/User'

export interface DeleteUserInputDTO {
    idToDelete: string
}

export interface DeleteUserOutputDTO {
    message: string,
    user: User
}

export const DeleteUserSchema = z.object({
    idToDelete: z.string().min(1)
}).transform(data => data as DeleteUserInputDTO)