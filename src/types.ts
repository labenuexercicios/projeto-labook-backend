import { type } from "os"

export type TUser = {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    createdAt: string
}

export type TPost = {
    id: string,
    creatorId: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updateAt: string
}