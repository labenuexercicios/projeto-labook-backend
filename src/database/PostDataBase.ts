import { PostDB, PostModel } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {

  private static TABLE_POSTS = "posts"

  public createPost = async (newPostDB: PostDB): Promise<void> => {
    await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .insert(newPostDB)
  }

  public findPosts = async (content: string) => {

    let result: PostModel[];

    if (content) {
      result = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .where("content", "LIKE", `%${content}%`)
    } else {
      result = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
    }
    return result
  }

  public findPostById = async (id: string) => {
    const [result]: PostDB[] | undefined[] = await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .where({ id })

    return result
  }

  public findUserPosts = async (creatorId: string) => {
    const [postDB]: PostDB[] | undefined[] = await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .where({ creator_id: creatorId })

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
