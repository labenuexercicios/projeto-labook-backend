import {  TLikesdislikesDB} from "../types";
import { BaseDatabase } from "./BaseDatabase";
import { PostDatabase } from "./postDataBase";

export class LikeDislikeDatabase extends BaseDatabase {
    public static TABLE_LIKES_DISLIKES = "likes_dislikes";

    public async LikeUserPostId(user_id : string, post_id : string){
        const [ result ] : TLikesdislikesDB[] | undefined[] = await BaseDatabase
            .connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES)
            .where({user_id, post_id});

        return result;
    }

    public async findLikesByPostId(post_id: string){
        const result : TLikesdislikesDB[] = await BaseDatabase
            .connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES)
            .where({post_id});
            
        return result;
    }

    public async createLike(newLikeDB : TLikesdislikesDB){
        await BaseDatabase
            .connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES)
            .insert(newLikeDB);
    }

    public async updateLikeByUserAndPostId(updatedLikeDB : TLikesdislikesDB, user_id : string, post_id : string){
        await BaseDatabase
            .connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES)
            .update(updatedLikeDB)
            .where({user_id, post_id});
    }

    public async deleteLikeByUserAndPostId(user_id : string, post_id : string){
        await BaseDatabase
            .connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES)
            .del()
            .where({user_id, post_id});
    }

    public async deleteLikesByPostId(post_id: string){
        await BaseDatabase
            .connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES)
            .del()
            .where({post_id});
    }
}