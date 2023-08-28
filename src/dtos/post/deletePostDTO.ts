import z from 'zod'
export interface DeletePostInputDTO {
    idToDelete: string,
    token: string 
}

export interface DeletePostOutputDTO {
    message: string
}

export const DeletePostSchema = z.object({
    idToDelete: z.string({
        required_error: "'id' é obrigatória.",
        invalid_type_error:"'id' deve ser do tipo string."
    }),
    token: z.string()
    
}).transform(data => data as DeletePostInputDTO)