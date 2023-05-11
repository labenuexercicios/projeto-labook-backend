import z from "zod";

export interface CreatePostInputDTO {
  token: string;
  content: string;
}

export type CreatePostOutputDTO = undefined;

export const CreatePostSchema = z
  .object({
    token: z.string().min(1),
    content: z.string().min(1),
  })
  .transform((data) => data as CreatePostInputDTO);
