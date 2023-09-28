import z from "zod"
import { PostModel } from "../../models/Post"

export interface GetPostsInputDTO {
  content?: string,
  token: string 
}

export const GetPostsSchema = z.object({
  content: z.string().min(1).optional(),
  token: z.string().min(1)
}).transform(data => data as GetPostsInputDTO)


export type GetPostsOutputDTO = PostModel[] | PostModel
