import { TLikesdislikesDB } from "../types";
import { BaseDatabase } from "./BaseData";

export class LikeDislikeDatabase extends BaseDatabase {
    public static TABLE_LIKES_DISLIKES = "likes_dislikes";

    public async LikeUserPostId(user_id: string, post_id: string): Promise<TLikesdislikesDB | undefined> {
        const result: TLikesdislikesDB | undefined = await BaseDatabase
            .connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES)
            .where({ user_id, post_id })
            .first();

        return result;
    }

    public async findLikesByPostId(post_id: string): Promise<TLikesdislikesDB[]> {
        const result: TLikesdislikesDB[] = await BaseDatabase
            .connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES)
            .where({ post_id });

        return result;
    }

    public async createLike(newLikeDB: TLikesdislikesDB): Promise<void> {
        await BaseDatabase
            .connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES)
            .insert(newLikeDB);
    }

    public async updateLikeByUserAndPostId(updatedLikeDB: TLikesdislikesDB, user_id: string, post_id: string): Promise<void> {
        await BaseDatabase
            .connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES)
            .update(updatedLikeDB)
            .where({ user_id, post_id });
    }

    public async deleteLikeByUserAndPostId(user_id: string, post_id: string): Promise<void> {
        await BaseDatabase
            .connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES)
            .del()
            .where({ user_id, post_id });
    }

    public async deleteLikesByPostId(post_id: string): Promise<void> {
        await BaseDatabase
            .connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES)
            .del()
            .where({ post_id });
    }
}