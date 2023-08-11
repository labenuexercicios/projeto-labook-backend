import z from 'zod'

export interface EditUserInputDTO {
    idToEdit: string,
    id?: string,
    name?:string,
    email?: string,
    role?: string,
    password?: string
}

export interface EditUsertOutputDTO {
    message: string;
    user: {
        id: string,
        name: string,
        email: string,
        password: string,
        role: string,
        createdAt: string;
    }
}
export const EditUserSchema = z.object({
    idToEdit: z.string().min(1),
    id: z.string().min(1).optional(),
    name: z.string().min(2).optional(),
    email: z.string().min(11).optional(),
    password: z.string().min(6).optional(),
    role: z.string().min(5).optional(),
}).transform(data => data as EditUserInputDTO)