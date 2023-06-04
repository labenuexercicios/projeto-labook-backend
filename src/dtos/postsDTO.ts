import { BadRequestError } from "../errors/BadRequestError";
import { Post } from "../models/post";

export interface CreatePostInputDTO {
    content: string;
    token: string;
}

export interface EditPostInputDTO {
    id: string;
    content: string;
    token: string;
}

export interface GetPostInputDTO {
    token: string;
}

export interface GetPostOutputDTO {
    id: string;
    content: string;
    likes: number;
    dislikes: number;
    createdAt: string;
    updatedAt: string;
    creator: {
        id: string;
        name: string;
    };
}

export interface GetPostByIdInputDTO {
    id: string;
    token: string;
}

export interface DeletePostInputDTO {
    id: string;
    token: string;
}

export class PostDTO {
    public getPostInput = (token: unknown): GetPostInputDTO => {
        if (typeof token !== "string") {
            throw new BadRequestError("Token inválido");
        }

        const result: GetPostInputDTO = {
            token,
        };

        return result;
    };

    public getPostOutput = (post: Post): GetPostOutputDTO => {
        const result: GetPostOutputDTO = {
            id: post.getId(),
            content: post.getContent(),
            likes: post.getLikes(),
            dislikes: post.getDislikes(),
            createdAt: post.getCreatedAt(),
            updatedAt: post.getCreatedAt(),
            creator: post.getCreator(),
        };

        return result;
    };

    public getPost = (token: unknown, id: string): GetPostByIdInputDTO => {
        if (typeof token !== "string") {
            throw new BadRequestError("Token inválido");
        }

        const result: GetPostByIdInputDTO = {
            id,
            token,
        };

        return result;
    };

    public createPost = (content: unknown, token: unknown): CreatePostInputDTO => {
        if (typeof content !== "string") {
            throw new BadRequestError("'content' deve ser uma string");
        }

        if (typeof token !== "string") {
            throw new BadRequestError("Token inválido");
        }

        const result: CreatePostInputDTO = {
            content,
            token,
        };

        return result;
    };

    public editPost = (id: string, content: unknown, token: unknown): EditPostInputDTO => {
        if (typeof content !== "string") {
            throw new BadRequestError("'content' deve ser uma string");
        }
        if (typeof token !== "string") {
            throw new BadRequestError("Token inválido");
        }

        const result: EditPostInputDTO = {
            id,
            content,
            token,
        };

        return result;
    };

    public deletePost = (id: string, token: unknown): DeletePostInputDTO => {
        if (typeof token !== "string") {
            throw new BadRequestError("Token inválido");
        }

        const result: DeletePostInputDTO = {
            id,
            token,
        };

        return result;
    };
}