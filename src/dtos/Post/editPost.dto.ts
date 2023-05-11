import z from "zod";

export interface EditPostInputDTO {
  idToEdit: string;
  token: string;
  content: string;
}

export type EditPostOutputDTO = undefined;

export const EditPostSchema = z
  .object({
    idToEdit: z.string().min(1),
    token: z.string().min(1),
    content: z.string().min(1),
  })
  .transform((data) => data as EditPostInputDTO);
