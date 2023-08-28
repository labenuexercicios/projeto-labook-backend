import { LikeOrDislikeDB, POST_LIKE } from "../models/Like";
import { PostDB, PostDBWithCreator, PostModel } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDataBase";

export class PostDatabase extends BaseDatabase {

  public static TABLE_POSTS = "posts";
  public static TABLE_LIKES_DISLIKES = "likes_dislikes";

  public createPost = async (
    newPostDB: PostDB
  ): Promise<void> => {

    await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .insert(newPostDB)
  }

  public getPosts = async (): Promise<PostDBWithCreator[]> => {

    const result: Array<PostDBWithCreator> = await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .select(
        `${PostDatabase.TABLE_POSTS}.id`,
        `${PostDatabase.TABLE_POSTS}.creator_id`,
        `${PostDatabase.TABLE_POSTS}.content`,
        `${PostDatabase.TABLE_POSTS}.likes`,
        `${PostDatabase.TABLE_POSTS}.dislikes`,
        `${PostDatabase.TABLE_POSTS}.created_at`,
        `${PostDatabase.TABLE_POSTS}.updated_at`,
        `${UserDatabase.TABLE_USERS}.name as creator_name`
      )
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${PostDatabase.TABLE_POSTS}.creator_id`,
        "=",
        `${UserDatabase.TABLE_USERS}.id`
      )

    return result 
  }

  public findPostById = async (
    id: string
  ): Promise<PostDBWithCreator> => {

    const [result] = await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .select(
        `${PostDatabase.TABLE_POSTS}.id`,
        `${PostDatabase.TABLE_POSTS}.creator_id`,
        `${PostDatabase.TABLE_POSTS}.content`,
        `${PostDatabase.TABLE_POSTS}.likes`,
        `${PostDatabase.TABLE_POSTS}.dislikes`,
        `${PostDatabase.TABLE_POSTS}.created_at`,
        `${PostDatabase.TABLE_POSTS}.updated_at`,
        `${UserDatabase.TABLE_USERS}.name as creator_name`
      )
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${PostDatabase.TABLE_POSTS}.creator_id`,
        "=",
        `${UserDatabase.TABLE_USERS}.id`
      )
      .where({ [`${PostDatabase.TABLE_POSTS}.id`]: id })

    return result as PostDBWithCreator
  }

  public findPostByContent = async (
    content: string
  ): Promise<PostDBWithCreator[]> => {

    const result = await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .select(
        `${PostDatabase.TABLE_POSTS}.id`,
        `${PostDatabase.TABLE_POSTS}.creator_id`,
        `${PostDatabase.TABLE_POSTS}.content`,
        `${PostDatabase.TABLE_POSTS}.likes`,
        `${PostDatabase.TABLE_POSTS}.dislikes`,
        `${PostDatabase.TABLE_POSTS}.created_at`,
        `${PostDatabase.TABLE_POSTS}.updated_at`,
        `${UserDatabase.TABLE_USERS}.name as creator_name`
      )
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${PostDatabase.TABLE_POSTS}.creator_id`,
        "=",
        `${UserDatabase.TABLE_USERS}.id`
      )
      .where("content", "LIKE", `%${content}`)

    return result as PostDBWithCreator[]
  }

  public findPostCreatorById = async (
    id: string
  ): Promise<PostDBWithCreator | undefined> => {

    const [result] = await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .select(
        `${PostDatabase.TABLE_POSTS}.id as post_id`,
        `${PostDatabase.TABLE_POSTS}.creator_id`,
        `${UserDatabase.TABLE_USERS}.name as creator_name`,
        `${PostDatabase.TABLE_POSTS}.content`
      )
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${PostDatabase.TABLE_POSTS}.creator_id`,
        "=",
        `${UserDatabase.TABLE_USERS}.id`
      ).where({ creator_id: id })

    return result as PostDBWithCreator | undefined
  }

  public findUserPosts = async (
    creatorId: string
  ): Promise<PostDBWithCreator[]> => {

    const postDB: Array<PostDBWithCreator> = await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .where({ creator_id: creatorId })

    return postDB
  }

  public updatePostById = async (
    idToEdit: string, postDB: PostDB
  ): Promise<void> => {

    await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .update(postDB)
      .where({ id: idToEdit })
  }

  public deletePostById = async (
    idToDelete: string
  ): Promise<void> => {

    await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .delete()
      .where({ id: idToDelete })
  }


  public likeOrDislikePost = async (
    id: string
  ): Promise<PostModel | undefined> => {

    const [result] = await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .select(
        `${PostDatabase.TABLE_POSTS}.id`,
        `${PostDatabase.TABLE_POSTS}.creator_id`,
        `${PostDatabase.TABLE_POSTS}.content`,
        `${PostDatabase.TABLE_POSTS}.likes`,
        `${PostDatabase.TABLE_POSTS}.dislikes`,
        `${PostDatabase.TABLE_POSTS}.created_at`,
        `${PostDatabase.TABLE_POSTS}.updated_at`,
        `${UserDatabase.TABLE_USERS}.name as creator_name`
      )
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${PostDatabase.TABLE_POSTS}.creator_id`,
        "=",
        `${UserDatabase.TABLE_USERS}.id`
      ).where({ [`${PostDatabase.TABLE_POSTS}.id`]: id })

    return result as PostModel | undefined
  }


  public findLikeOrDislike = async (
    likeOrDislikeDB: LikeOrDislikeDB
  ): Promise<POST_LIKE | undefined> => {

    const [result]: Array<LikeOrDislikeDB | undefined> = await BaseDatabase
      .connection(PostDatabase.TABLE_LIKES_DISLIKES)
      .select()
      .where({
        user_id: likeOrDislikeDB.user_id,
        post_id: likeOrDislikeDB.post_id
      })

    if (result === undefined) {
      return undefined
    } else if (result.like === 1) {
      return POST_LIKE.ALREADY_LIKED
    } else {
      return POST_LIKE.ALREADY_DISLIKED
    }

  }

  public deleteLikeOrDislike = async (
    likeOrDislikeDB: LikeOrDislikeDB
  ): Promise<void> => {

    await BaseDatabase
      .connection(PostDatabase.TABLE_LIKES_DISLIKES)
      .delete()
      .where({
        user_id: likeOrDislikeDB.user_id,
        post_id: likeOrDislikeDB.post_id
      })
  }

  public updateLikeOrDislike = async (
    likeOrDislikeDB: LikeOrDislikeDB
  ): Promise<void> => {

    await BaseDatabase
      .connection(PostDatabase.TABLE_LIKES_DISLIKES)
      .update(likeOrDislikeDB)
      .where({
        user_id: likeOrDislikeDB.user_id,
        post_id: likeOrDislikeDB.post_id
      })
  }

  public insertLikeOrDislike = async (
    likeOrDislikeDB: LikeOrDislikeDB
  ): Promise<void> => {

    await BaseDatabase
      .connection(PostDatabase.TABLE_LIKES_DISLIKES)
      .insert(likeOrDislikeDB)
  }

}
