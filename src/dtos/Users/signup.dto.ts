import z from "zod";

export interface SignupInputDto {
  name: string;
  email: string;
  password: string;
}

export interface SignupOutputDto {
    token: string
}

export const SignupSchema = z.object({ 
    name: z.string().min(1).nonempty(),
    email: z.string().email().nonempty(),
    password: z.string().min(1).nonempty()
 }).transform((data)=>data as SignupInputDto)
