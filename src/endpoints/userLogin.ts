import { z } from "zod"

export interface userLoginInputDTO {
    email: string,
    password: string,
}

export interface userLoginOutputDTO {
    token: string
}

export const userLoginSchema = z.object({
    email: z.string({
        required_error: "'email' is required.",
        invalid_type_error: "'email' must be of type string."
    }).email("'email' invalid."),
    password: z.string({
        required_error: "'password' is required.",
        invalid_type_error: "'password' must be of type string."
    }).min(5, "'password' must be at least 5 characters long."),
}).transform(data => data as userLoginInputDTO)