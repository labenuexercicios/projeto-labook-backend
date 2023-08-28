import z from "zod"
import { UserModel } from "../../models/User"

export interface GetUsersInputDTO {
  name: string,
  token: string 
}

export type GetUsersOutputDTO = UserModel[]

export const GetUsersSchema = z.object({
  name: z.string().min(1).optional(),
  token: z.string().min(1)
}).transform(data => data as GetUsersInputDTO)