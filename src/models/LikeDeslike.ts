import { LikeDeslikeDB, LikeDeslikeModel } from "../types";

export class LikeDeslike {
  constructor(
    private userId: string,
    private postId: string,
    private like: number
  ) {}

  public getUserId(): string {
    return this.userId;
  }
  public setUserId(value: string): void {
    this.userId = value;
  }
  public getPostId(): string {
    return this.postId;
  }
  public setPostId(value: string): void {
    this.postId = value;
  }
  public getLike(): number {
    return this.like;
  }
  public setLike(value: number): void {
    this.like = value;
  }
  public toBusinessModel(): LikeDeslikeModel {
    return {
      userId: this.userId,
      postId: this.postId,
      like: this.like,
    };
  }
  public toDBModel(): LikeDeslikeDB {
    return {
      user_id: this.userId,
      post_id: this.postId,
      like: this.like,
    };
  }
}
