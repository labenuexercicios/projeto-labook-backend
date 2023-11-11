import { PostDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  public static TABLE_POSTS = "posts";

  public async getPosts() {
    const result: Array<PostDB> = await BaseDatabase.connection(
      PostDatabase.TABLE_POSTS
    );
    return result;
  }

  public async getPostById(id: string): Promise<PostDB | undefined> {
    const [postDb]: Array<PostDB | undefined> = await BaseDatabase.connection(
      PostDatabase.TABLE_POSTS
    ).where("id", id);
    return postDb;
  }

  public async insertPost(post: PostDB): Promise<void> {
    await BaseDatabase.connection(PostDatabase.TABLE_POSTS).insert(post);
  }

  public async updatePost(post: PostDB, id: string): Promise<void> {
    await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
      .update(post)
      .where("id", id);
  }

  public async deletePost(postDB: any, id: string): Promise<void> {
    await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
      .del(postDB)
      .where("id", id);
  }
}
