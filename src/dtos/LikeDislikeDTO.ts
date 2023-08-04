import { BadRequestError } from "../errors/BadRequestError";

export class LikeDislike {
    constructor(
        private userId: string,
        private postId: string,
        private like =  0
    ){}

    public getUserId() : string {
        return this.userId;
    }

    public setUserId(value : string) : void {
        this.userId = value;
    }

    public getPostId() : string {
        return this.postId;
    }

    public setPostId(value : string) : void {
        this.postId = value;
    }

    public getLike() : number {
        return this.like;
    }

    public setLike(value : number) : void {
        this.like = value;
    }
}
export interface EditPostLikesInputDTO {
    id : string
    like : boolean
    token: string
}

export class LikeDislikeDTO {


editPostLikes = (id : string, like : unknown, token: unknown) : EditPostLikesInputDTO => {
        
    if (typeof like !== "boolean"){
        throw new BadRequestError("'like' deve ser um boolean");
    }
    if (typeof token !== "string"){
        throw new BadRequestError("Token inválido");
    }

    const result : EditPostLikesInputDTO = {
        id,
        like,
        token
    }

    return result;
}}