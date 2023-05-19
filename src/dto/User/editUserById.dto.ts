import { z } from "zod"

export interface EditUserByIdInputDTO {
  idToEditUser: string,
  name?: string,
  email?: string,
  password?: string,
  token: string
}

export interface EditUserByIdOutputDTO {
  message: string
}

export const EditUserByIdSchema = z.object({
    idToEditUser: z.string().min(1),
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    password: z.string().regex(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g), 'A senha deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial.').optional(),
    token: z.string().min(1)
}).transform(data => data as EditUserByIdInputDTO)