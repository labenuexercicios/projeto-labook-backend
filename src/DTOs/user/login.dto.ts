import z from "zod";

export interface LoginInputDTO {
  email: string;
  password: string;
}

export interface LoginOutputDTO {
  token: string;
}

export const LoginSchema = z.object({
    email: z.string().email({message:"Email inválido"}),
    password: z.string().min(6,{
        message:"A senha deve conter no mínimo 6 caracteres."
    })
}).transform(data=> data as LoginInputDTO)
