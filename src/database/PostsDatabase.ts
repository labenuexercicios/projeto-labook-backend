import { LikeDislikeDB, POST_LIKE, PostDB, PostWithCreatorDB } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";
import { UsersDatabase } from "./UserDatabase";

export class PostsDatabase extends BaseDatabase {
  public static TABLE_POSTS = "posts"
  public static TABLE_LIKES_DISLIKES = "likes_dislikes"

  public async insertPost(newPostDB: PostDB): Promise<void> {
    await BaseDatabase
      .connection(PostsDatabase.TABLE_POSTS)
      .insert(newPostDB)
  }

  public async getPostsWithCreator(query: string | undefined): Promise<PostWithCreatorDB[]> {

    if (query) {
      const result: PostWithCreatorDB[] = await BaseDatabase
        .connection(PostsDatabase.TABLE_POSTS)
        .where("content", "LIKE", `%${query}%`)
        .select(
          `${PostsDatabase.TABLE_POSTS}.id`,
          `${PostsDatabase.TABLE_POSTS}.content`,
          `${PostsDatabase.TABLE_POSTS}.likes`,
          `${PostsDatabase.TABLE_POSTS}.dislikes`,
          `${PostsDatabase.TABLE_POSTS}.created_at`,
          `${PostsDatabase.TABLE_POSTS}.updated_at`,
          `${PostsDatabase.TABLE_POSTS}.creator_id`,
          `${UsersDatabase.TABLE_USERS}.name AS creator_name`
        )
        .join(`${UsersDatabase.TABLE_USERS}`, `${PostsDatabase.TABLE_POSTS}.creator_id`, "=", `${UsersDatabase.TABLE_USERS}.id`)

      return result as PostWithCreatorDB[]

    } else {
      const result: PostWithCreatorDB[] = await BaseDatabase
        .connection(PostsDatabase.TABLE_POSTS)
        .select(
          `${PostsDatabase.TABLE_POSTS}.id`,
          `${PostsDatabase.TABLE_POSTS}.content`,
          `${PostsDatabase.TABLE_POSTS}.likes`,
          `${PostsDatabase.TABLE_POSTS}.dislikes`,
          `${PostsDatabase.TABLE_POSTS}.created_at`,
          `${PostsDatabase.TABLE_POSTS}.updated_at`,
          `${PostsDatabase.TABLE_POSTS}.creator_id`,
          `${UsersDatabase.TABLE_USERS}.name AS creator_name`
        )
        .join(`${UsersDatabase.TABLE_USERS}`, `${PostsDatabase.TABLE_POSTS}.creator_id`, "=", `${UsersDatabase.TABLE_USERS}.id`)

      return result as PostWithCreatorDB[]

    }
  }

  public async getPostById(id: string): Promise<PostDB | undefined> {
    const [result]: PostDB[] = await BaseDatabase
      .connection(PostsDatabase.TABLE_POSTS)
      .where({ id: id })

    return result as PostDB | undefined
  }

  public async updatePostById(id: string, postDB: PostDB): Promise<void> {
    await BaseDatabase
      .connection(PostsDatabase.TABLE_POSTS)
      .update(postDB)
      .where({ id: id })
  }

  public async deleteUserById(id: string): Promise<void> {
    await BaseDatabase
      .connection(PostsDatabase.TABLE_POSTS)
      .del().where({ id: id })
  }

  public async getPostWithCreatorById(id: string): Promise<PostWithCreatorDB | undefined> {

    const [result]: PostWithCreatorDB[] = await BaseDatabase
      .connection(PostsDatabase.TABLE_POSTS)
      .select(
        `${PostsDatabase.TABLE_POSTS}.id`,
        `${PostsDatabase.TABLE_POSTS}.content`,
        `${PostsDatabase.TABLE_POSTS}.likes`,
        `${PostsDatabase.TABLE_POSTS}.dislikes`,
        `${PostsDatabase.TABLE_POSTS}.created_at`,
        `${PostsDatabase.TABLE_POSTS}.updated_at`,
        `${PostsDatabase.TABLE_POSTS}.creator_id`,
        `${UsersDatabase.TABLE_USERS}.name AS creator_name`
      )
      .join(`${UsersDatabase.TABLE_USERS}`, `${PostsDatabase.TABLE_POSTS}.creator_id`, "=", `${UsersDatabase.TABLE_USERS}.id`)
      .where({ [`${PostsDatabase.TABLE_POSTS}.id`]: id })

    return result as PostWithCreatorDB | undefined
  }

  public async getLikeDislike(likeDislikeDB: LikeDislikeDB): Promise<POST_LIKE | undefined> {

    const [result]: LikeDislikeDB[] | undefined = await BaseDatabase
      .connection(PostsDatabase.TABLE_LIKES_DISLIKES)
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id
      })

    return result === undefined ? undefined : result && result.like === 1 ? POST_LIKE.ALREADY_LIKED : POST_LIKE.ALREADY_DISLIKED
  }

  public removeLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
    await BaseDatabase
      .connection(PostsDatabase.TABLE_LIKES_DISLIKES)
      .delete()
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id
      })
  }

  public updateLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
    await BaseDatabase
      .connection(PostsDatabase.TABLE_LIKES_DISLIKES)
      .update(likeDislikeDB)
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id
      })
  }

  public insertLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
    await BaseDatabase
      .connection(PostsDatabase.TABLE_LIKES_DISLIKES)
      .insert(likeDislikeDB)
  }

}