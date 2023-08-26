import { LikeDislikeDB, POST_LIKE, PostDB, postDBWithCreatorName } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class PostDatabase extends BaseDatabase {
  public static TABLE_POSTS = "posts"
  public static TABLE_LIKES_DISLIKES = "likes_dislikes"
  //
  public getAllPosts = async (): Promise<PostDB[]> => {
    const posts = await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .select();
    return posts
  }
  public insertPost = async (postDB: PostDB): Promise<void> => {
    await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .insert(postDB)
  }
  public getPostById = async (id: string): Promise<PostDB | undefined> => {

  const [result] = await BaseDatabase
  .connection(PostDatabase.TABLE_POSTS)
  .select()
  .where({ id })
  return result as PostDB | undefined

  }
  public updatePost = async (input: any): Promise<void> => {
    await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .where({ id: input.id })
      .update(input);
  }

  public deletePostById = async (id: string): Promise<void> => {
    await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .del()
      .where({ id })
  }
  public findPostWithCreatorById = async (id: string): Promise<postDBWithCreatorName | undefined> => {
    const [result] = await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .select(
        `${PostDatabase.TABLE_POSTS}.id`,
        `${PostDatabase.TABLE_POSTS}.creator_id`,
        `${PostDatabase.TABLE_POSTS}.content`,
        `${PostDatabase.TABLE_POSTS}.likes`,
        `${PostDatabase.TABLE_POSTS}.dislikes`,
        `${PostDatabase.TABLE_POSTS}.createdAt`,
        `${PostDatabase.TABLE_POSTS}.updatedAt`,
        `${UserDatabase.TABLE_USERS}.name as creator_name`
      )
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${PostDatabase.TABLE_POSTS}.creator_id`,
        "=",
        `${UserDatabase.TABLE_USERS}.id`
      )
      .where({[`${PostDatabase.TABLE_POSTS}.id`]: id})
      return result as postDBWithCreatorName | undefined
  }
  async findPostById(postId: string) {
    return await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .where('id', postId)
      .first();
  }
  public findLikeDislike = async(likeDislikeDB: LikeDislikeDB):Promise<POST_LIKE | undefined> => {
    
    const [result]:Array<LikeDislikeDB | undefined> = await BaseDatabase
      .connection(PostDatabase.TABLE_LIKES_DISLIKES)
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id,
      })
      if (result === undefined) {
        return undefined
      } else if (result.like === 1){
        return POST_LIKE.ALREADY_LIKED
      } else {
        return POST_LIKE.ALREADY_DISLIKED
      }
  }

  public insertLikeDislike = async(likeDislikeDB: LikeDislikeDB): Promise<void> => {
    await BaseDatabase
      .connection(PostDatabase.TABLE_LIKES_DISLIKES)
      .insert(likeDislikeDB);
  }
  public updateLikeDislike = async (likeDislikeDB: LikeDislikeDB):Promise <void> => {
    await BaseDatabase
      .connection(PostDatabase.TABLE_LIKES_DISLIKES)
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id,
      })
      .update(likeDislikeDB);
  }

  public deleteLikeDislike = async(likeDislikeDB: LikeDislikeDB): Promise<void> => {
    await BaseDatabase
      .connection(PostDatabase.TABLE_LIKES_DISLIKES)
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id,
      })
      .del();
  }
}