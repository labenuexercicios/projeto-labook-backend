
import { USER_ROLES } from "./models/modelUser"

export interface userDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
}

export interface postDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number
    dislikes: number,
    created_at: string,
    updated_at: string,
}

export interface postUserDB extends postDB {
    userId: string,
    userName: string
}

export interface likeDislikeDB {
    post_id: string,
    user_id: string,
    like: number
}


