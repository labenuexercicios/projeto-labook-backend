import { z } from "zod"
import { PostModel } from "../../models/Post"

export interface GetPostsInputDTO {
    query: string,
    token: string
}

export type GetPostsOutputDTO = PostModel[]

export const GetPostsSchema = z.object({
    query: z.string().min(1).optional(),
    token: z.string().min(1)
}).transform(data => data as GetPostsInputDTO)