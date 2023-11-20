import z from 'zod'

export interface CreateUserInputDTO {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string
}

export interface CreateUserOutputDTO {
    message: string,
    user: {
        id: string,
        name: string,
        email: string,
        password: string,
        role: string,
        creadtedAt: string
    }
}

export const CreateUserSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.string().min(1)
}).transform(data => data as CreateUserInputDTO)