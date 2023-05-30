import z from "zod"
import { PostModel } from "../models/Posts"

export interface GetPostsInputDTO {
  token: string
  creatorId: string,
  content: string
}

// UserModel é a estrutura de User que será devolvida para o Front (sem password)
export type GetPostsOutputDTO = PostModel[]

export const GetPostsSchema = z.object({
  token: z.string().min(1),
  creatorId: z.string().min(1),
  content: z.string().min(1)
}).transform(data => data as GetPostsInputDTO)

export const GetPostsInputSchema = z.object({
  token: z.string().min(1)
}).transform(data => data as GetPostsInputDTO)