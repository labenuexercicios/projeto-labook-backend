import { z } from "zod"

export interface tokenCheckInputDTO {
    token: string
}

export const tokenCheckSchema = z.object({
    token: z.string().min(1)
}).transform(data => data as tokenCheckInputDTO)