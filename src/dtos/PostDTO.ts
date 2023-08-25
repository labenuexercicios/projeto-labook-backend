import { BadRequestError } from "../errors/BadRequestError"
import { PostModel } from "../types"

export interface GetPostInputDTO{
    token: string | undefined
}

export type GetPostOutputDTO = PostModel[]

export interface CreatePostInputDTO {
    content: string,
    tokenUser: string | undefined
}

export interface CreatePostOutputDTO {
    message: string,
    post: {
        id: string,
        creatorId: string,
        content: string,
        newLikes: number,
        newDislikes: number,
        createdAt: string,
        updatedAt: string
    }
}

export interface EditPostInputDTO {
    idToEdit: string,
    content: string,
    token: string | undefined
}

export interface EditPostOutputDTO {
    message: string,
    post: {
        idToEdit: string,
        creatorId: string,
        content: string,
        likes: number,
        dislikes: number,
        createdAt: string,
        updatedAt: string
    }
}

export interface DeletePostInputDTO{
    idToDelete: string,
    token: string | undefined
}

export class PostDTO {

    public createPostInput(
        content: unknown,
        tokenUser: unknown
    ): CreatePostInputDTO {

        if (typeof tokenUser !== "string") throw new BadRequestError("'token' deve ser string")


        if (typeof content !== "string") throw new BadRequestError("'content' deve ser string")

        const dto: CreatePostInputDTO = {
            content,
            tokenUser
        }

        return dto
    }

    public editPostInput(
        idToEdit: unknown | undefined,
        token: string | undefined,
        content: unknown | undefined
    ): EditPostInputDTO {

        if (typeof idToEdit !== "string") throw new BadRequestError("'id' deve ser string")


        if (typeof content !== "string") throw new BadRequestError("'title' deve ser string")

        if (typeof token !== "string") throw new BadRequestError("'token' deve ser string")

        const dto = {
            idToEdit,
            token,
            content
        }

        return dto

    }

    public deletePostInput(
        idToDelete: unknown,
        token: unknown
    ): DeletePostInputDTO {

        if (typeof token !== "string") throw new BadRequestError("'token' deve ser string")


        if (typeof idToDelete !== "string") throw new BadRequestError("'id' deve ser string")

        const dto: DeletePostInputDTO = {
            idToDelete,
            token
        }

        return dto
    }
}