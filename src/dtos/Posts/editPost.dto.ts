import z from 'zod'

export interface EditPostInputDTO {
    idToEdit: string,
    creatorId: string,
    content: string,
    token: string
}

export interface EditPostOutputDTO {
    message: string;
    post: {
        id: string,
        creatorId: string,
        content: string,
        likes: number,
        dislikes: number
        createdAt: string,
        updatedAt: string
    }
}
export const EditPostSchema = z.object({
    idToEdit: z.string().min(1),
    creatorId: z.string().min(1),
    content: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as EditPostInputDTO)