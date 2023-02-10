

export type TUsers = {
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

export type TLikes_dislikes = {
    user_id: string,
    post_id: string,
    like: number
}