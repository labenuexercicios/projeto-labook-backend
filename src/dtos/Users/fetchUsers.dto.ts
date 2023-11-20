import z from 'zod'
import { User, UserModel } from '../../models/User';


export interface FetchUsersInputDTO {
    nameToSearch?: string,
}

export interface FetchUsersOutputDTO {
    users: Array<User>
}

export const FetchUsersSchema = z.object({
    nameToSearch: z.string().min(1).optional()
}).transform(data => data as FetchUsersInputDTO)