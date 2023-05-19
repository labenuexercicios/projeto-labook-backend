import { z } from "zod"

export interface EditPostByIdInputDTO {
  idToEditPost: string,
  content: string,
  token: string
}

export interface EditPostByIdOutputDTO {
  message: string
}

export const EditPostByIdSchema = z.object({
    idToEditPost: z.string().min(1),
    content: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as EditPostByIdInputDTO)