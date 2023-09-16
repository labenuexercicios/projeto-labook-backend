import { BaseDatabase } from "./BaseDatabase";
import { LikeDislikeDB, POST_LIKE, PostDB, PostWithCreatorDB } from "../models/Post"

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes"

    public async insertPost(newPostDB: PostDB) {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS).insert(newPostDB)
    }

    public async findPosts(q: string | undefined) {
        if (q) {
            const result: PostDB[] = await BaseDatabase.connection(PostDatabase.TABLE_POSTS).where("name", "LIKE", `%${q}%`)
            return result
        } else {
            const result: PostDB[] = await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            return result
        }
    }
    public async findPostById(id: string | undefined):Promise<PostDB | undefined> {
        const [postDB]: PostDB[] | undefined[] = await BaseDatabase.connection(PostDatabase.TABLE_POSTS).where({id})
        return postDB
    }
    public async updatePost(idToEdit: string, newPostDB: PostDB):Promise<void> {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS).update(newPostDB).where({id: idToEdit})
    }
    public async deletePostById(idToDelete: string):Promise<void> {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS).delete().where({id: idToDelete})
    }
    public async findPostByCreatorId(postId: string) {
        const result: PostWithCreatorDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select(
                "posts.id",
                "posts.creator_id",
                "posts.content",
                "posts.likes",
                "posts.dislikes",
                "posts.created_at",
                "posts.updated_at",
                "users.name AS creator_name"

            )
            .join("users", "posts.creator_id", "=", "users.id")
            .where("posts.id", postId)

        return result[0]
    }
    public async getPostWithCreator(): Promise <PostWithCreatorDB[]> {
        const result: PostWithCreatorDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select(
                "posts.id",
                "posts.creator_id",
                "posts.content",
                "posts.likes",
                "posts.dislikes",
                "posts.created_at",
                "posts.updated_at",
                "users.name AS creator_name"

            )
            .join("users", "posts.creator_id", "=", "users.id")

        return result
    }
    public async findPostWithCreatorById(postId: string): Promise <PostWithCreatorDB | undefined> {
        const result: PostWithCreatorDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select(
                "posts.id",
                "posts.creator_id",
                "posts.content",
                "posts.likes",
                "posts.dislikes",
                "posts.created_at",
                "posts.updated_at",
                "users.name AS creator_name"

            )
            .join("users", "posts.creator_id", "=", "users.id")
            .where("posts.id", postId)

        return result[0]
    }
    public async likeDislikePost(likeDislike: LikeDislikeDB) {
        await BaseDatabase
        .connection(PostDatabase.TABLE_LIKES_DISLIKES)
        .insert(likeDislike)
    }
    public async findLikeDislike(likeDislikeToFind: LikeDislikeDB):Promise<POST_LIKE | null>{
        const [likeDislikeDB]: LikeDislikeDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_LIKES_DISLIKES)
        .select()
        .where({
            user_id: likeDislikeToFind.user_id,
            post_id: likeDislikeToFind.post_id
        })

        if(likeDislikeDB){
            return likeDislikeDB.like === 1 ? POST_LIKE.ALREADY_LIKED : POST_LIKE.ALREADY_DISLIKED
        }else{
            return null
        }
    }
    public async removeLikeDislike(likeDislikeDB:LikeDislikeDB) {
        await BaseDatabase
        .connection(PostDatabase.TABLE_LIKES_DISLIKES)
        .delete()
        .where({
            user_id: likeDislikeDB.user_id,
            post_id: likeDislikeDB.post_id
        })
    }
    public async updateLikeDislike(likeDislikeDB:LikeDislikeDB) {
        await BaseDatabase
        .connection(PostDatabase.TABLE_LIKES_DISLIKES)
        .update(likeDislikeDB)
        .where({
            user_id: likeDislikeDB.user_id,
            post_id: likeDislikeDB.post_id
        })
    }
}