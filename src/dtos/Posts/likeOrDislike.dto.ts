import z from 'zod'

export interface LikeOrDislikePostInputDTO {
    postId: string,
    like: boolean,
    token: string
}

export type LikeOrDislikePostOutputDTO = undefined

export const LikeOrDislikePostSchema = z.object({
    postId: z.string().min(1),
    like: z.boolean(),
    token: z.string().min(1)
}).transform(data => data as LikeOrDislikePostInputDTO)

