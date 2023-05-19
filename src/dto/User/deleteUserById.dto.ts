import { z } from "zod"

export interface DeleteUserByIdInputDTO {
  idToDelete: string,
  token: string
}

export interface DeleteUserByIdOutputDTO {
  message: string
}

export const DeleteUserByIdSchema = z.object({
    idToDelete: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as DeleteUserByIdInputDTO)