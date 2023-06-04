import { TPostsDB } from "../types";
import { BaseDatabase } from "./BaseData";

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts";

    public async findPosts(): Promise<TPostsDB[]> {
        const result: TPostsDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS);

        return result;
    }

    public async findPostById(id: string): Promise<TPostsDB | undefined> {
        const result: TPostsDB | undefined = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where({ id })
            .first();

        return result;
    }

    public async createPost(newPostDB: TPostsDB): Promise<void> {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .insert(newPostDB);
    }

    public async editPost(updatedPostDB: TPostsDB, id: string): Promise<void> {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .update(updatedPostDB)
            .where({ id });
    }

    public async deletePost(id: string): Promise<void> {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .del()
            .where({ id });
    }
}