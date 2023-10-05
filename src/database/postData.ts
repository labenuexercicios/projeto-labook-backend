import { likeDislikeDB, postDB, postUserDB } from "../types";
import { baseDatabase } from "../database/databBase1";

export class databasePost extends baseDatabase {
    public static TABLE_POST = "post"

    public async findPostById(id: string): Promise<postDB | undefined> {
        const [result] = await baseDatabase.connection(databasePost.TABLE_POST).where({ id })

        if (!result) {
            return undefined
        }

        const post: postDB = {
            id: result.id,
            creator_id: result.creator_id,
            content: result.content,
            likes: result.likes,
            dislikes: result.dislikes,
            created_at: result.created_at,
            updated_at: result.updated_at
        }

        return post
    }

    public async findPost():
        Promise<postUserDB[]> {
        const result: postUserDB[] = await baseDatabase.connection(databasePost.TABLE_POST)
            .select(
                "post.id",
                "post.creator_id",
                "post.content",
                "post.likes",
                "post.dislikes",
                "post.created_at",
                "post.updated_at",
                "users.id as userId",
                "users.name as userName"
            )
            .from("post")
            .innerJoin("users", "post.creator_id", "users.id")

        return result
    }

    public async createPost(newpostDB: postDB): Promise<postDB[]> {
        const result: postDB[] = await baseDatabase.connection(databasePost.TABLE_POST).insert(newpostDB)
        return result
    }

    public async updatePost(id: string, content: string): Promise<void> {
        await baseDatabase.connection(databasePost.TABLE_POST).update({content}).where({ id })
    }
    
    public async delete(id: string): Promise<void>{
        await baseDatabase.connection(databasePost.TABLE_POST).del().where({id})
    }

    public async findLikeDislike(postId: string, userId: string): Promise<likeDislikeDB>{
       const [result]: likeDislikeDB[]=  await baseDatabase.connection("likes_dislikes")
       .where({post_id: postId})
       .andWhere({user_id: userId})
       return result
    }

    public async createLikeDislike(likeDislikeDB:likeDislikeDB): Promise<void>{
        await baseDatabase.connection("likes_dislikes")
        .insert(likeDislikeDB).onConflict(['user_id', 'post_id'])
        .merge()
    }

    public async deleteLikeDislike(postId: string, userId: string): Promise<void>{
        await baseDatabase.connection("likes_dislikes").del()
        .where({post_id: postId})
        .andWhere({user_id: userId})
    }

    public async incrementLike(postId: string): Promise<void>{
        await baseDatabase.connection(databasePost.TABLE_POST)
        .where({id: postId})
        .increment('likes')
    }

    public async decrementLike(postId: string): Promise<void>{
        await baseDatabase.connection(databasePost.TABLE_POST)
        .where({id: postId})
        .decrement('likes')
    }

    public async incrementDislike(postId: string): Promise<void>{
        await baseDatabase.connection(databasePost.TABLE_POST)
        .where({id: postId})
        .increment('dislikes')
    }

    public async decrementDislike(postId: string): Promise<void>{
        await baseDatabase.connection(databasePost.TABLE_POST)
        .where({id: postId})
        .decrement('dislikes')
    }

    public async revertLikeToDislike(postId: string): Promise<void>{
        await baseDatabase.connection(databasePost.TABLE_POST)
        .where({id: postId})
        .increment('dislikes')
        .decrement('likes')
    }

    public async revertDislikeToLike(postId: string): Promise<void>{
        await baseDatabase.connection(databasePost.TABLE_POST)
        .where({id: postId})
        .increment('likes')
        .decrement('dislikes')
    }
}