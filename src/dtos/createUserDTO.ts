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
        role:string,
        createdAt: string
    }
}

export const CreateUserSchema = z.object({
    id: z.string({
        required_error: "'id' é obrigatório.",
        invalid_type_error: "'id' deve ser do tipo string."
    }).min(1, "'id' deve ter pelo menos um caractere."),
    name: z.string({
        required_error: "'name' é obrigatório.",
        invalid_type_error: "'name' deve ser do tipo string."
    }).min(2, "'name' deve ter pelo menos dois caracteres."),
    email: z.string({
        required_error: "'email' é obrigatório.",
        invalid_type_error: "'email' deve ser do tipo string."
    }).email("O campo deve ser um email válido."),
    password: z.string({
        required_error: "'password' é obrigatório.",
        invalid_type_error: "'password' deve ser do tipo string."
    }).min(5, "'password' deve ter pelo menos cinco caracteres."),
    role: z.string({
        required_error: "'role' é obrigatório.",
        invalid_type_error: "'role' deve ser do tipo string."
    }).min(1, "'role' deve ter pelo menos um caractere.")
}).transform(data => data as CreateUserInputDTO)