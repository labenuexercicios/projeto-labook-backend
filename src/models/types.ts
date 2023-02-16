export type TUser = {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    created_at: string
}

export type TPosts = {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
}

export type TPostsLike = {
    likes: number,
    dislikes: number,
}

export interface GetPostDB {
    id:string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string
    updatedAt: string,
    creator: {
        id: string,
        name: string
}
}

