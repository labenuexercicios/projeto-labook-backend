import z from "zod";

export interface DeletePostsInputDTO {
  idToDelete: string;
  token: string
}

export type DeletePostsoutputDTO = undefined

export const deletePostSchema = z
  .object({
    idToDelete: z.string().min(2),
    token: z.string().min(2)
  })
  .transform((data) => data as DeletePostsInputDTO);