import z from "zod"
import { PostModel } from "../../models/Post"

export interface GetPostsInputDTO {
  content: string,
  token: string 
}

export interface GetUserPostsInputDTO {
  creatorId: string,
  token: string 
}

export type GetPostsOutputDTO = PostModel[]

export type GetUserPostsOutputDTO = PostModel[]

export const GetPostsSchema = z.object({
  content: z.string().min(1),
  token: z.string().min(1)
}).transform(data => data as GetPostsInputDTO)

export const GetUserPostsSchema = z.object({
  creatorId: z.string().min(1),
  token: z.string().min(1)
}).transform(data => data as GetUserPostsInputDTO)