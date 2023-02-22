import { PostDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  public static TABLE_POST = "posts";

  public async findPosts() {
    const result: PostDB[] = await BaseDatabase.connection(
      PostDatabase.TABLE_POST
    );

    return result;
  }

  public async createPost(newPostDB: PostDB) {
    await BaseDatabase.connection(PostDatabase.TABLE_POST).insert(newPostDB);
  }
}
