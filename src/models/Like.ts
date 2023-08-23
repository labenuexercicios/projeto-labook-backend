export interface LikeDB {
    user_id: string,
    post_id: string,
    like: number
}

export interface LikeModel {
    user_id: string,
    post_id: string,
    like: number
}

export class Like {
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

    public toDBModel(): LikeDB {
        return {
            user_id: this.userId,
            post_id: this.postId,
            like: this.like
        }
    }

    public toBusinessModel(): LikeModel {
        return {
            user_id: this.userId,
            post_id: this.postId,
            like: this.like
        }
    }

}
