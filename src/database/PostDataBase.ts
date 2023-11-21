import { Post } from "../models/Post";
import { TPosts } from "../models/types";
import { BaseDatabase } from "./BaseDataBase";


export class PostDataBase extends BaseDatabase{

    public static TABLE_POSTS = "posts"
     
    public async findGetPostId(id: string){
        const [idExists]: TPosts[] | undefined[] = await BaseDatabase
        .conection(PostDataBase.TABLE_POSTS)
        .where({ id });

        return idExists
    }


    public async insertPost(newProduct: TPosts){
        await BaseDatabase
        .conection(PostDataBase.TABLE_POSTS)
        .insert(newProduct)
    }


    public async findGetPost(){
        const result: TPosts[] = await BaseDatabase
        .conection(PostDataBase.TABLE_POSTS)

        return result
    }


    public async findPostId(idParams: string):Promise<TPosts | undefined>{
        const post: TPosts[] = await BaseDatabase
       .conection(PostDataBase.TABLE_POSTS).select()
       .where({ id: idParams })


    return post[0]
    }


    public async findUpdatePost(updatePost: TPosts, id: string):Promise<void>{
        await BaseDatabase
        .conection(PostDataBase.TABLE_POSTS)
        .update(updatePost)
        .where({id: id})
    }
    


    public async deletePostId( deletePost: string):Promise<void>{
        await BaseDatabase.conection(PostDataBase.TABLE_POSTS)
        .delete()
        .where({id: deletePost})
    }
}