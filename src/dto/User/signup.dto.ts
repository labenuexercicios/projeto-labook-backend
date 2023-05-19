import { z } from "zod"

export interface SignupInputDTO {
  name: string,
  email: string,
  password: string
}

export interface SignupOutputDTO {
  message: string,
  token: string
}

export const SignupSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().regex(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g), 'A senha deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial.')
}).transform(data => data as SignupInputDTO)