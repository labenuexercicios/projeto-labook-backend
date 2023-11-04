import { PostModel } from "../../models/Post"
import z from 'zod'
export type GetPostsInputDTO = {
    token: string
}

export type GetPostsOutputDTO = PostModel[]

export const GetPostsSchema = z.object({
    token: z.string().min(1), // adicionamos token também no schema
  }).transform(data => data as GetPostsInputDTO)