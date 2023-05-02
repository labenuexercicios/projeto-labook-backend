export class Post {
  constructor(
    private id: string,
    private content: string,
    private likes: number,
    private deslikes: number,
    private created_at: string,
    private updated_at: string,
    private creator_id: string
  ) {}

  public getId(): string {
    return this.id;
  }
  public setId(value: string): void {
    this.id = value;
  }
  public getContent(): string {
    return this.content;
  }
  public setContent(value: string): void {
    this.content = value;
  }
  public getLike(): number {
    return this.likes;
  }
  public setLike(value: number): void {
    this.likes = value;
  }
  public getDeslike(): number {
    return this.deslikes;
  }
  public setDeslike(value: number): void {
    this.deslikes = value;
  }
  public getCreatedAt(): string {
    return this.created_at;
  }
  public setCreatedAt(value: string): void {
    this.created_at = value;
  }
  public getUpdateAt(): string {
    return this.updated_at;
  }
  public setUpdateAt(value: string): void {
    this.updated_at = value;
  }
  public getCreatorId(): string {
    return this.creator_id;
  }
  public setCreatorId(value: string): void {
    this.creator_id = value;
  }
}
