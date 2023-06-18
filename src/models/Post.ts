import { v4 as uuidv4 } from 'uuid';

class Post {
  public readonly id: string;
  public content: string;
  public likes: number;
  public dislikes: number;
  public createdAt: Date;
  public updatedAt: Date;
  public creatorId: string;

  constructor(content: string, creatorId: string) {
    this.id = uuidv4();
    this.content = content;
    this.likes = 0;
    this.dislikes = 0;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.creatorId = creatorId;
  }
}

export default Post;
