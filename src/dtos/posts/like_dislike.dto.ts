import z from "zod"

export interface LikeDislikeinputDTO{
    idPost: string,
    token:string,
    like: boolean
}

export type LikeDislikeOutputDTO = undefined

export const LikeDislikeSchema = z.object({
    idPost: z.string().min(2),
    token: z.string().min(2),
    like: z.boolean()
}).transform(data => data as LikeDislikeinputDTO)