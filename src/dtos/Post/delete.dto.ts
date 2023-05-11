import z from "zod";

export interface DeletePostInputDTO {
  idToDelete: string;
  token: string;
}

export type DeletePostOutputDTO = undefined;

export const DeletePostSchema = z
  .object({
    idToDelete: z.string().min(1),
    token: z.string().min(1),
  })
  .transform((data) => data as DeletePostInputDTO);
