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


    public async findPostId(idParams: string){
        const [post] = await BaseDatabase
       .conection(PostDataBase.TABLE_POSTS)
       .where({ id: idParams })


    return post
    }


    public async findUpdatePost(updatePost: TPosts, id: string){
        await BaseDatabase
        .conection(PostDataBase.TABLE_POSTS)
        .update(updatePost)
        .where({id: id})
        console.log("estou aqui",id);
    }
    


    public async deletePostId( deletePost: string):Promise<void>{
        await BaseDatabase.conection(PostDataBase.TABLE_POSTS)
        .delete()
        .where({id: deletePost})
    }
}