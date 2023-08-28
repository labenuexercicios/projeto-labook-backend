export interface LikeOrDislikeDB {
    user_id: string,
    post_id: string,
    like: number
}

export interface LikeOrDislikeModel {
    user_id: string,
    post_id: string,
    like: number
}

export enum POST_LIKE{
    ALREADY_LIKED = "ALREADY LIKED",
    ALREADY_DISLIKED = "ALREADY DISLIKED"
}

export class LikeOrDislike {
    constructor(
        private userId: string,
        private postId: string,
        private like: number
    ) { }

    public getUserId(): string {
        return this.userId
    }

    public setUserId(value: string): void {
        this.userId = value
    }

    public getPostId(): string {
        return this.postId
    }

    public setPostId(value: string): void {
        this.postId = value
    }

    public getLike(): number {
        return this.like
    }

    public setLike(value: number){
        this.like = value
    }

    public toDBModel(): LikeOrDislikeDB {
        return {
            user_id: this.userId,
            post_id: this.postId,
            like: this.like
        }
    }

    public toBusinessModel(): LikeOrDislikeModel {
        return {
            user_id: this.userId,
            post_id: this.postId,
            like: this.like
        }
    }

}
