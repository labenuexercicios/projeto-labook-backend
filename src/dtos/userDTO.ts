import { UserModel } from "../types"

export interface GetUsersInput {
    q: string
}

export type GetUsersOutput = UserModel[]

export interface SignupInput {
    name: unknown,
    email: unknown,
    password: unknown
}

export interface SignupOutput {
    message: string,
    token: string
}

export interface LoginInput {
    email: unknown,
    password: unknown
}

export interface LoginOutput {
    message: string,
    token: string
}