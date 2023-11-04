import {  POST_LIKE, PostsDB, likeDeslikeDB  } from "../models/post";

import { BaseDatabase } from "./base_database";

export class PostsDatabase extends BaseDatabase {
  public static TABLE_NAME = "posts";
  public static TABLE_LIKES_DISLIKES = "likes_dislikes"

  public async insertPost(newPost: PostsDB) {
    await BaseDatabase.connection(PostsDatabase.TABLE_NAME).insert(newPost);
  }

  public async getPosts () : Promise<PostsDB[]>{
    const data : PostsDB[] = await BaseDatabase
    .connection(PostsDatabase.TABLE_NAME);
    return data
  }
  
  public async updatePost ( postsDB: PostsDB) {
    await BaseDatabase
      .connection(PostsDatabase.TABLE_NAME)
      .update(postsDB)
      .where({ id: postsDB.id })
  }

  public async findPostById(idToEdit: string): Promise<PostsDB | undefined> {
    const [PostsDB]: PostsDB[] | undefined[] = await BaseDatabase.connection(
      PostsDatabase.TABLE_NAME
    ).where({ id:idToEdit });

    return PostsDB;
  }

  public async deletePostById(idToDelete: string) {
    await BaseDatabase
      .connection(PostsDatabase.TABLE_NAME)
      .delete()
      .where({ id: idToDelete })
  }

  public findLikeDislike = async (
    likeDislikeDB: likeDeslikeDB
  ): Promise<POST_LIKE | undefined> => {

    const [result]: Array<likeDeslikeDB | undefined> = await BaseDatabase
      .connection(PostsDatabase.TABLE_LIKES_DISLIKES)
      .select()
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id
      })

    if (result === undefined) {
      return undefined

    } else if (result.like === 1) {
      return POST_LIKE.ALREADY_LIKED
      
    } else {
      return POST_LIKE.ALREADY_DISLIKED
    }
  }

  public removeLikeDislike = async (
    likeDislikeDB: likeDeslikeDB
  ): Promise<void> => {
    await BaseDatabase
      .connection(PostsDatabase.TABLE_LIKES_DISLIKES)
      .delete()
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id
      })
  }

  public updateLikeDislike = async (
    likeDislikeDB: likeDeslikeDB
  ): Promise<void> => {
    await BaseDatabase
      .connection(PostsDatabase.TABLE_LIKES_DISLIKES)
      .update(likeDislikeDB)
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id
      })
  }

  public insertLikeDislike = async (
    likeDislikeDB: likeDeslikeDB
  ): Promise<void> => {
    await BaseDatabase
      .connection(PostsDatabase.TABLE_LIKES_DISLIKES)
      .insert(likeDislikeDB)
  }
}