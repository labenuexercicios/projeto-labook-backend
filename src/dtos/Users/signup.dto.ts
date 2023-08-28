import z from "zod"
import { USER_ROLES } from "../../models/User"

export interface SignupInputDTO {
  id: string,
  name: string,
  email: string,
  password: string, 
  role: USER_ROLES
}

export interface SignupOutputDTO {
  token: string
}

export const SignupSchema = z.object({
  name: z.string().min(2),
  email: z.string().min(11),
  password: z.string().min(4),
}).transform(data => data as SignupInputDTO)