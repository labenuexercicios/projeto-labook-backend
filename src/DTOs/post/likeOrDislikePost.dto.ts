import z from 'zod'

export interface LikeOrDislakePostInputDTO{
    postId: string,
    token: string,
    like: Boolean,
}

export type LikeOrDislikePostOutputDTO = undefined


export const LikeOrDislikePostSchema = z.object({
    postId: z.string().min(1),
    token: z.string().min(1),
    like: z.boolean()
}).transform(data=> data as LikeOrDislakePostInputDTO)