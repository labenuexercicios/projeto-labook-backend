import { z } from "zod"

export interface postCreateInputDTO {
    content: string,
    token: string
}

export const postCreateSchema = z.object({
    content: z.string(),
    token: z.string()
}).transform(data => data as postCreateInputDTO)