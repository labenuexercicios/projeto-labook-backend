import { Post } from "../models/Post"
import { PostModel } from "../types"

export interface CreatePostInputDTO {
    content : string
    token: string
}

export interface GetPostInputDTO {
    token: string
}

export interface GetPostOutputDTO {
    id : string
    content : string
    likes: number
    dislikes: number
    createdAt: string
    updatedAt: string
    creator: {
        id: string,
        name: string
    }
}

export type GetPostsOutput = PostModel[]

export class PostDTO {
    getPostInput = (token: unknown) : GetPostInputDTO => {
        if (typeof token !== "string"){
            throw new Error ("Token inválido");
        }

        const result : GetPostInputDTO = {
            token
        }

        return result;
    }


    getPostOutput = (post: Post) : GetPostOutputDTO => {
        const result : GetPostOutputDTO = {
            id: post.getId(),
            content: post.getContent(),
            likes: post.getLikes(),
            dislikes: post.getDislikes(),
            createdAt: post.getCreatedAt(),
            updatedAt: post.getCreatedAt(),
            creator: post.getCreator()
        }
        
        return result;
    }
}