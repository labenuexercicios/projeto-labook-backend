
import { LikeDislikeDB, PostDB } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";
export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes"

    public insertPost = async (postDB: PostDB): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS).insert(postDB)
    }

    public getPosts = async (): Promise<PostDB[]> => {
        const response: PostDB[] = await BaseDatabase.connection(PostDatabase.TABLE_POSTS)

        return response
    }
    public findById = async (id: string): Promise<PostDB | undefined> => {
        const [PostDB]: PostDB[] = await BaseDatabase.connection(PostDatabase.TABLE_POSTS).select()
            .where({ id: id })
        return PostDB
    }
    public updatePost = async (postDB: PostDB): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .update({
                content: postDB.content,
                updated_at: postDB.updated_at,
                likes: postDB.likes,
                dislikes: postDB.dislikes
            })
            .where({
                id: postDB.id
            })
    }
    public deletePost = async (postDB: PostDB): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS).delete()
            .where({ id: postDB.id })
    }
    public findLikeDislike = async (postId: string, userId: string): Promise<LikeDislikeDB | undefined> => {
        const [likeDislikeDB]: LikeDislikeDB[] = await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES).select()
            .where({
                post_id: postId,
                user_id: userId
            })

        return likeDislikeDB
    }
    public insertLikeDislike = async (postId: string, userId: string, like: number): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .insert({  
                post_id: postId,
                user_id: userId,
                like: like
            })
    }

    public updateLikeDislike = async (postId: string, userId: string, like: number): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .update({
                like: like
            }).where({
                user_id: userId,
                post_id: postId
            })
    }

    public deletelikeDislike = async (postId: string, userId: string): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES).delete().where({ user_id: userId, post_id: postId })
    }
}