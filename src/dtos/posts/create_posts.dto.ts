import z from "zod";


export interface CreatePostInputDTO {
  content: string;
  token: string;
  likes: number;
  deslikes: number;
}

export type CreatePostOutputDTO = undefined

export const createPostSchema = z.object({
  content: z.string().min(2),
  token: z.string().min(2)
}).transform(data => data as CreatePostInputDTO)