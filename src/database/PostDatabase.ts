import { PostDB } from "../models/Posts";
// import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  public static TABLE_POSTS = "posts"

  public async findPosts(): Promise<PostDB[]> {

    const result: PostDB[] = await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)

    const postsDB = result
    return postsDB
    }

  public async createPost(
    newPostDB: PostDB
  ):Promise<void> {
    await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .insert(newPostDB)
  }

  // public async insertUser(
  //   newUserDB: UserDB
  // ): Promise<void> {
  //   await BaseDatabase
  //     .connection(UserDatabase.TABLE_USERS)
  //     .insert(newUserDB)
  // }
  
}
