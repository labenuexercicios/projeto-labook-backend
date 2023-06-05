import { Request } from "express";
import { BaseDatabase} from "./BaseDataBase";
import { LikeDislikeDB, POST_LIKE, PostDB, PostDBWithCreatorName } from "../models/Post";
import { UserDatabase } from "./UserDataBase";

export class PostDataBase extends BaseDatabase{
    static POST_TABLE = 'posts'
    static LIKE_DELIKE_TABLE = 'likes_dislikes' 

    public insertPost = async (
        postDB: PostDB
      ): Promise<void> => {
        await BaseDatabase
          .connection(PostDataBase.POST_TABLE)
          .insert(postDB)
      }

      public getPostWithNameCreator = async () :Promise<PostDBWithCreatorName[]> => {
        
      const result = await BaseDatabase
      .connection(PostDataBase.POST_TABLE)
      .select(
        `${PostDataBase.POST_TABLE}.id`,
        `${PostDataBase.POST_TABLE}.creator_id`,
        `${PostDataBase.POST_TABLE}.content`,
        `${PostDataBase.POST_TABLE}.likes`,
        `${PostDataBase.POST_TABLE}.dislikes`,
        `${PostDataBase.POST_TABLE}.created_at`,
        `${PostDataBase.POST_TABLE}.updated_at`,
        `${UserDatabase.TABLE_USERS}.name as creator_name`
      )
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${PostDataBase.POST_TABLE}.creator_id`, 
        "=",
        `${UserDatabase.TABLE_USERS}.id`
      )
    
    return result as PostDBWithCreatorName[]
      }

      public findPostById = async(id: string): Promise<PostDB | undefined> =>{
        const[result] = await BaseDatabase
        .connection(PostDataBase.POST_TABLE)
        .select()
        .where({id})

        return result as PostDB | undefined

      }

      public updatePost = async(postDB : PostDB) : Promise<void> => {
        await BaseDatabase
        .connection(PostDataBase.POST_TABLE)
        .update(postDB)
        .where ({id: postDB.id})
      }

      public deletePostById = async (
        id: string
      ): Promise<void> => {
        await BaseDatabase
          .connection(PostDataBase.POST_TABLE)
          .delete()
          .where({ id })
      }
      public getPostWithNameCreatorById = async (id:string): Promise<PostDBWithCreatorName | undefined> =>{
        const [result] = await BaseDatabase
        .connection(PostDataBase.POST_TABLE)
        .select(
          `${PostDataBase.POST_TABLE}.id`,
          `${PostDataBase.POST_TABLE}.creator_id`,
          `${PostDataBase.POST_TABLE}.content`,
          `${PostDataBase.POST_TABLE}.likes`,
          `${PostDataBase.POST_TABLE}.dislikes`,
          `${PostDataBase.POST_TABLE}.created_at`,
          `${PostDataBase.POST_TABLE}.updated_at`,
          `${UserDatabase.TABLE_USERS}.name as creator_name`
        )
        .join(
          `${UserDatabase.TABLE_USERS}`,
          `${PostDataBase.POST_TABLE}.creator_id`, 
          "=",
          `${UserDatabase.TABLE_USERS}.id`
        ).where(
          {[`${PostDataBase.POST_TABLE}.id`]: id}
        )

        return result as PostDBWithCreatorName | undefined
      }

      public findLikeDislike = async (likeDislikeDB : LikeDislikeDB): Promise<POST_LIKE | undefined> =>{
        const [result] : Array<LikeDislikeDB | undefined> = await BaseDatabase
        .connection(PostDataBase.LIKE_DELIKE_TABLE)
        .where({
          user_id: likeDislikeDB.user_id,
          post_id: likeDislikeDB.post_id
        })
        
        if (result === undefined) {
          return undefined          
        }else if (result.like === 1){
          return POST_LIKE.ALREADY_LIKED
        }else{
          return POST_LIKE.ALREADY_DISLIKED
        }

      }

      public removeLikeDislike = async (
        likeDislikeDB: LikeDislikeDB
      ): Promise<void> => {
        await BaseDatabase
          .connection(PostDataBase.LIKE_DELIKE_TABLE)
          .delete()
          .where({
            user_id: likeDislikeDB.user_id,
            post_id: likeDislikeDB.post_id
          })
      }
    
      public updateLikeDislike = async (
        likeDislikeDB: LikeDislikeDB
      ): Promise<void> => {
        const{user_id, post_id} = likeDislikeDB
        await BaseDatabase
          .connection(PostDataBase.LIKE_DELIKE_TABLE)
          .update({user_id,post_id})
          .where({
            user_id,
            post_id
          })
      }
    
      public insertLikeDislike = async (
        likeDislikeDB: LikeDislikeDB
      ): Promise<void> => {
        const {user_id, post_id, like} = likeDislikeDB
        await BaseDatabase
          .connection(PostDataBase.LIKE_DELIKE_TABLE)
          .insert({user_id, post_id, like})
      }
    
}