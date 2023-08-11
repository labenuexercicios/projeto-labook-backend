import { PostDB } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {

  private static TABLE_POSTS = "posts"

  public insertPost = async (newPostDB: PostDB):Promise<void> => {
    await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .insert(newPostDB)
  }

  public findPosts = async (q: string | undefined) => {
    if (q) {
      const result: PostDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .where("content", "LIKE", `%${q}%`)

      return result

    } else {
      const result: PostDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)

      return result
    }
  }

  public findPostById = async (id: string) => {
    const [postDB]: PostDB[] | undefined[] = await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .where({ id })

    return postDB
  }

  public updatePostById = async (idToEdit: string, postDB: PostDB) => {
    await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .update(postDB)
      .where({ id: idToEdit })
  }

  public deletePostById = async (idToDelete: string) => {
    await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .delete()
      .where({ id: idToDelete })
  }
}
