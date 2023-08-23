import z from "zod"

export interface CreatePostInputDTO {
    id: string,
    creatorId: string,
    content: string,
    likes: number,
    dislikes: number,
    token: string
}

export interface CreatePostOutputDTO {
  content: string
}

export const CreatePostSchema = z.object({
  content: z.string().min(1),
  likes: z.number().min(0),
  dislikes: z.number().min(0),
  token: z.string().min(1)
}).transform(data => data as CreatePostInputDTO)