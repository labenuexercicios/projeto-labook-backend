import z from 'zod'

export interface EditPostInputDTO {
    idToEdit: string,
    id?: string,
    creatorId?: string,
    content?: string,
    likes?: number,
    dislikes?: number
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
    id: z.string().min(1).optional(),
    creatorId: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    likes: z.number().gt(0).optional(),
    dislikes: z.number().gt(0).optional()

}).transform(data => data as EditPostInputDTO)