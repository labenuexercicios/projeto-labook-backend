export interface PostDB {
  id: string;
  creator_id: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: string;
  updated_at: string;
}

export enum POST_LIKE {
  ALREADY_LIKED = "ALREADY LIKED",
  ALREADY_DISLIKED = "ALREADY DISLIKED"
}

export interface LikeDislikeDB {
  user_id: string,
  post_id: string,
  like: number
}

export interface PostModel {
  id: string;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
  creator: {
    id: string;
    name: string;
  }
}
export interface PostDBWithCreatorName {
  id: string,
  creator_id: string,
  content: string,
  likes: number,
  dislikes: number,
  created_at: string,
  updated_at: string,
  creator_name: string
}
export class Post {
  constructor(
    private id: string,
    private content: string,
    private likes: number,
    private dislikes: number,
    private createdAt: string,
    private updatedAt: string,
    private creatorId: string,
    private creatorName: string
  ) {}

  public getId() {
    return this.id;
  }
  public setId(id: string): void {
    this.id = id;
  }

  public getContent() {
    return this.content;
  }
  public setContent(content: string): void {
    this.content = content;
  }

  public getLikes() {
    return this.likes;
  }
  public setLikes(likes: number): void {
    this.likes = likes;
  }

  public addLike = (): void => {
    this.likes++
  }

  public removeLike = (): void => {
    this.likes--
  }

  public getDislikes() {
    return this.dislikes;
  }
  public setDislikes(dislikes: number): void {
    this.dislikes = dislikes;
  }

  public addDislike = (): void => {
    this.dislikes++
  }

  public removeDislike = (): void => {
    this.dislikes--
  }

  public getCreated_at() {
    return this.createdAt;
  }
  public setCreated_at(created_at: string): void {
    this.createdAt = created_at;
  }

  public getUpdatedAt() {
    return this.updatedAt;
  }
  public setUpdatedAt(updatedAt: string): void {
    this.updatedAt = updatedAt;
  }

  public getCreatorId() {
    return this.creatorId;
  }
  public setCreatorId(creatorId: string): void {
    this.creatorId = creatorId;
  }

  public getCreatorName() {
    return this.creatorId;
  }
  public setCreatorName(creatorName: string): void {
    this.creatorName = creatorName;
  }



  public toDBModel(): PostDB {
    return {
      id: this.id,
      creator_id: this.creatorId,
      content: this.content,
      likes: this.likes,
      dislikes: this.dislikes,
      created_at: this.createdAt,
      updated_at: this.updatedAt
    };
  }

  public toPostModel(): PostModel {
    return {
      id: this.id,
      content: this.content,
      likes: this.likes,
      dislikes: this.dislikes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      creator: {
        id: this.creatorId,
        name: this.creatorName
      }
    }
  }
}
