import z from "zod"
import { PostModel } from "../../models/Post"

export interface GetPostsInputDTO {
  token: string 
}

export interface GetPostsByContentInputDTO {
  content: string,
  token: string 
}

export interface GetPostByIdInputDTO {
  id: string,
  token: string 
}

export interface GetUserPostsInputDTO {
  creatorId: string,
  token: string 
}

export const GetPostsSchema = z.object({
  token: z.string().min(1)
}).transform(data => data as GetPostsInputDTO)


export const GetPostsByContentSchema = z.object({
  content: z.string().min(1),
  token: z.string().min(1)
}).transform(data => data as GetPostsByContentInputDTO)


export const GetPostByIdSchema = z.object({
  id: z.string().min(1),
  token: z.string().min(1)
}).transform(data => data as GetPostByIdInputDTO)


export const GetUserPostsSchema = z.object({
  creatorId: z.string().min(1),
  token: z.string().min(1)
}).transform(data => data as GetUserPostsInputDTO)

export type GetPostsOutputDTO = PostModel[]
export type GetSinglePostOutputDTO = PostModel
export type GetUserPostsOutputDTO = PostModel[]
