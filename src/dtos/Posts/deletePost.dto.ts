import z from 'zod'

export interface DeletePostInputDTO {
    idToDelete: string,
    token: string
}

export interface DeletePostOutputDTO {
    message: string;
    post: {
        id: string,
        creatorId: string,
        content: string,
        likes: number,
        dislikes: number,
        createdAt: string,
        updatedAt: string
    }
}
export const DeletePostSchema = z.object({
    idToDelete: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as DeletePostInputDTO)