import { PostDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  public static TABLE_POST = "posts";

  public async findePosts() {
    const postsDB: PostDB[] = await BaseDatabase.connection(
      PostDatabase.TABLE_POST
    );
    return postsDB;
  }
  public async findPostById(id: string) {
    const [postsDB]: PostDB[] | undefined[] = await BaseDatabase.connection(
      PostDatabase.TABLE_POST
    ).where({ id });

    return postsDB;
  }
  public async insertPost(newPostDB: PostDB) {
    await BaseDatabase.connection(PostDatabase.TABLE_POST).insert(newPostDB);
  }
  public async updatePostById(id: string, newPost: number) {
    await BaseDatabase.connection(PostDatabase.TABLE_POST)
      .update({ content: newPost })
      .where({ id });
  }
}
