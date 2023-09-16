import { z } from "zod"

export interface LikeDislikeInputDTO{
    idToLikeDislike: string,
    token: string ,
    like: unknown
}

export const LikeDislikeSchema = z.object({
    idToLikeDislike: z.string({
        required_error: "'id' é obrigatória.",
        invalid_type_error:"'id' deve ser do tipo string."
    }),
    token: z.string({
        required_error: "'price' é obrigatório.",
        invalid_type_error: "'price' deve ser do tipo number."
    }).optional(),
    like: z.boolean()
   
}).transform(data => data as LikeDislikeInputDTO)