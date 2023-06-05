import z from 'zod'

export interface SingUpInputDTO{
    name: string,
    email: string,
    password: string
}

export interface SingUpOutputDTO{
    token: string
}

export const SingUpSchema = z.object({
name: z.string().min(2),
email: z.string().email({message:"digite um email válido"}),
password: z.string().min(6,{
    message:"Digite um Password com no mínimo 6 caracteres."
})}).transform(data=> data as SingUpInputDTO)

