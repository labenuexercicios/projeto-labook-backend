import { PostDB } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  public static TABLE_POSTS = "posts"

  public async insertPost(newPostDB: PostDB) {
    await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .insert(newPostDB)
  }

  public async findPosts(q: string | undefined) {
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

  public async findPostById(id: string) {
    const [postDB]: PostDB[] | undefined[] = await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .where({ id })

    return postDB
  }

  public async updatePostById(idToEdit: string, postDB: PostDB) {
    await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .update(postDB)
      .where({ id: idToEdit })
  }

  public async deletePostById(idToDelete: string) {
    await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .delete()
      .where({ id: idToDelete })
  }
}
