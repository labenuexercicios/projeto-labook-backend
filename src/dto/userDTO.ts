import { GetPostDB } from "../models/types"

export interface SignupInputDTO{
    name: unknown,
    email: unknown,
    password: unknown
}


export interface SignupOutputDTO {
    token: string
}

export interface LoginInputDTO {  
    email: unknown,
    password: unknown
}

export interface LoginOutputDTO {
    token: string
}

export interface GetPostInputDTO {
    token: string | undefined
}

export type GetPostOutputDTO = GetPostDB[]

export interface CreatePostDTO {
    token: string | undefined
    content: unknown
}

export interface EditPostInputDTO {
    idParams: string,
    token: string | undefined,
    content: unknown
}

export interface DeletePostInputDTO {
    id: string,
    token: string | undefined
}

export interface LikeOrDislikeDTO {
    idLikeOrDislike: string,
    token: string | undefined,
    like: unknown
}