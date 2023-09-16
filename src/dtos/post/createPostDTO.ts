import z from 'zod'

export interface CreatePostInputDTO {
    //id: string,
    //creator_id: string,
    content: string,
    //likes: number,
    //dislikes: number,
    token: string 
}

export interface CreatePostOutputDTO {
    message: string,
    post: {
        
        creator_id: string,
        content: string,
        newLikes: number,
        newDislikes: number,
        createdAt: string,
        updatedAt: string
    }
}

export const CreatePostSchema = z.object({
    
    
    content: z.string({
        required_error: "'email' é obrigatório.",
        invalid_type_error: "'email' deve ser do tipo string."
    }),
    token: z.string()
   
    
}).transform(data => data as CreatePostInputDTO)