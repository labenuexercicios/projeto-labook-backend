export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
}

export interface PostDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string
}

export interface LikesDislikesDB {
    user_id: string,
    post_id: string,
    like: LIKE_DISLIKE
}

export enum LIKE_DISLIKE {
    LIKE = 1,
    DISLIKE = 0
}

export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface TokenPayload {
    id: string,
    name: string,
    role: USER_ROLES
}