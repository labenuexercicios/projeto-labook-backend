import z from "zod"

export interface likeDislikeInputDTO {
    token: string,
    postId: string,
    like: boolean
}

export type likeDislikeOutputDTO = undefined

export const likeDislikeSchema = z.object({
    token: z.string().min(1),
    postId: z.string().min(1),
    like:z.boolean()
}).transform(data => data as likeDislikeInputDTO)