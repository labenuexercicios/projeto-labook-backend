import { z } from "zod"

export interface userCreateInputDTO {
    name: string,
    email: string,
    password: string
}

export interface userCreateOutputDTO {
    message: string,
    token: string
}


export const userCreateSchema = z.object({
    name: z.string({
        invalid_type_error: "'name' must be of type string."
    }).min(2),
    email: z.string({
        invalid_type_error: "'email' must be of type string."
    }).email("'email' invalid."),
    password: z.string({
        invalid_type_error: "'password' must be of type string."
    }).min(5, "'password' must be at least 5 characters long.")
}).transform(data => data as userCreateInputDTO)