import z from "zod";

export interface EditPostsInputDTO {
  idToEdit: string;
  content: string,
  token: string
}

export type EditPostsoutputDTO = undefined

export const EditPostSchema = z
  .object({
    idToEdit: z.string().min(2),
    content: z.string().min(2),
    token: z.string().min(2)
  })
  .transform((data) => data as EditPostsInputDTO);