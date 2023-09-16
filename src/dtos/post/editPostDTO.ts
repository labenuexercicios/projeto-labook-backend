import z from 'zod'
export interface EditPostInputDTO {
    idToEdit: string,
    content?: string,
    token: string 
}

export interface EditPostOutputDTO {
    message: string,
    post: {
        idToEdit: string,
        creator_id: string,
        content?: string,
        likes: number,
        dislikes: number,
        createdAt: string,
        updatedAt: string
    }
}

export const EditPostSchema = z.object({
    idToEdit: z.string({
        required_error: "'id' é obrigatória.",
        invalid_type_error:"'id' deve ser do tipo string."
    }),
    content: z.string({
        required_error: "'price' é obrigatório.",
        invalid_type_error: "'price' deve ser do tipo number."
    }).optional(),
    token: z.string()
   
}).transform(data => data as EditPostInputDTO)