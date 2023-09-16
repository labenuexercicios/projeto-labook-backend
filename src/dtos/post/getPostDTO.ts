import { z } from "zod"
import { PostModel } from "../../models/Post"

export interface GetPostInputDTO{
    token: string 
}

export type GetPostOutputDTO = PostModel[]

export const GetPostSchema = z.object({
    token: z.string({
        required_error: "'id' é obrigatória.",
        invalid_type_error:"'id' deve ser do tipo string."
    })
   
}).transform(data => data as GetPostInputDTO)