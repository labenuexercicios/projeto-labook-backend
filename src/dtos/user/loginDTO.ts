import z from 'zod'

export interface LoginInputDTO {
    email: string,
    password: string
}

export interface LoginOutputDTO {
    message: string,
    token: string
}

export const LoginSchema = z.object({
    email: z.string({
        required_error:"O campo 'email' é obrigatório.",
    }).email({
        message:"Este email não é válido."
    }),
    password: z.string({
        required_error:"O campo 'password' é obrigatório."
    }).min(4)
}).transform(data => data as LoginInputDTO)