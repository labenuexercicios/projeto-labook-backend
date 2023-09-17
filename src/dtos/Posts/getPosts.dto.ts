import z from "zod"
import { PostModel } from "../../models/Post"

export interface GetPostsInputDTO {
  content?: string,
  token: string 
}

export interface GetPostByIdInputDTO {
  id: string,
  token: string 
}

export const GetPostsSchema = z.object({
  content: z.string().min(1).optional(),
  token: z.string().min(1)
}).transform(data => data as GetPostsInputDTO)

export const GetPostByIdSchema = z.object({
  id: z.string().min(1),
  token: z.string().min(1)
}).transform(data => data as GetPostByIdInputDTO)


export type GetPostsOutputDTO = PostModel[] | PostModel
