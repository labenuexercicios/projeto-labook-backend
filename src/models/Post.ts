export interface PostDB {
  id: string,
  content: string,
  likes: number,
  dislikes: number,
  created_at: string,
  updated_at: string,
  creator_id: string,
}

export interface PostWithCreatorDB extends PostDB {
  creator_name: string
}

export interface PostModel {
  id: string,
  content: string,
  likes: number,
  dislikes: number,
  createdAt: string,
  updatedAt: string,
  creator: {
    id: string,
    name: string
  }
}

export interface LikeDislikeDB {
  user_id: string,
  post_id: string,
  like: number
}

export enum POST_LIKE {
  ALREADY_LIKED = "ALREADY LIKED",
  ALREADY_DISLIKED = "ALREADY DISLIKED"
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
    private creatorName: string,
  ) { }

  // Getters e setters para as propriedades da classe

  public get ID(): string {
    return this.id;
  }

  public get CONTENT(): string {
    return this.content;
  }

  public get LIKES(): number {
    return this.likes;
  }

  public get DISLIKES(): number {
    return this.dislikes;
  }

  public get CREATED_AT(): string {
    return this.createdAt
  }

  public get UPDATED_AT(): string {
    return this.updatedAt
  }

  public get CREATOR_ID(): string {
    return this.creatorId;
  }

  public get CREATOR_NAME(): string {
    return this.creatorName;
  }

  public set CONTENT(newContent: string) {
    this.content = newContent;
  }

  public set LIKES(newLikes: number) {
    this.likes = newLikes;
  }

  public set DISLIKES(newDislikes: number) {
    this.dislikes = newDislikes;
  }

  public set UPDATED_AT(newUpdatedAt: string) {
    this.updatedAt = newUpdatedAt;
  }

  // Métodos para adicionar/remover likes e dislikes

  public addLike(): void {
    this.likes += 1
  }

  public removeLike(): void {
    this.likes -= 1
  }

  public addDislike(): void {
    this.dislikes += 1
  }

  public removeDislike(): void {
    this.dislikes -= 1
  }

  // Métodos para converter entre modelos de banco de dados e modelos de negócio

  public toDBModel(): PostDB {
    return {
      id: this.id,
      creator_id: this.creatorId,
      content: this.content,
      likes: this.likes,
      dislikes: this.dislikes,
      created_at: this.createdAt,
      updated_at: this.updatedAt
    }
  }

  public toBusinessModel(): PostModel {
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
