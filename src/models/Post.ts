import { PostDB, PostModel } from "../types";

export class Post {
  constructor(
    private id: string,
    private content: string,
    private likes: number,
    private deslikes: number,
    private createdAt: string,
    private updatedAt: string,
    private creatorId: string
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
    return this.createdAt;
  }
  public setCreatedAt(value: string): void {
    this.createdAt = value;
  }
  public getUpdateAt(): string {
    return this.updatedAt;
  }
  public setUpdateAt(value: string): void {
    this.updatedAt = value;
  }
  public getCreatorId(): string {
    return this.creatorId;
  }
  public setCreatorId(value: string): void {
    this.creatorId = value;
  }
  public toBusinessModel(): PostModel {
    return {
      id: this.id,
      content: this.content,
      likes: this.likes,
      deslikes: this.deslikes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      creatorId: this.creatorId,
    };
  }
  public toDBModel(): PostDB {
    return {
      id: this.id,
      content: this.content,
      likes: this.likes,
      deslikes: this.deslikes,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      creator_id: this.creatorId,
    };
  }
}
