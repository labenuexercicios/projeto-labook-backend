export class LikeDeslike {
  constructor(
    private user_id: string,
    private post_id: string,
    private like: number
  ) {}

  public getUserId(): string {
    return this.user_id;
  }
  public setUserId(value: string): void {
    this.user_id = value;
  }
  public getPostId(): string {
    return this.post_id;
  }
  public setPostId(value: string): void {
    this.post_id = value;
  }
  public getLike(): number {
    return this.like;
  }
  public setLike(value: number): void {
    this.like = value;
  }
}
