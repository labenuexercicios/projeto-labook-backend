import z from 'zod'
export interface LikeDislikeInputDTO {
    token: string,
    postId: string,
    like: boolean
}
export type LikeDislikeOutputDTO = undefined

export const LikeDislikeSchema = z.object({    
    token: z.string().min(1),
    postId: z.string().min(1),
    like: z.boolean()
}).transform(data => data as LikeDislikeInputDTO)