import { PostDataBase } from "../database/PostDataBase";
import { UserDataBase } from "../database/UserDataBase";
import { BadRequestError } from "../errors/BadRequestError";
import { Post } from "../models/Post";
import { TPosts, TPostsLike } from "../models/types";
import { User } from "../models/User";

export class PostBusiness{
    public createPost = async (input: any)=>{
        const { id, creator_id, content, likes, dislikes, created_at, updated_at } = input;
            
        if (!id || !creator_id || !content  ) {

            throw new BadRequestError("Dados inválidos")
        }

        if (id !== undefined) {

            if (typeof id !== "string") {
    
                throw new BadRequestError("'id' deve ser string")
               }
            }
        
        if (creator_id !== undefined) {

            if (typeof creator_id !== "string") {
    
                throw new BadRequestError("'creator_id' deve ser string")
                 }
            }

        if (likes !== undefined) {

            if (typeof likes !== "number") {
    
                throw new BadRequestError("'likes' deve ser number")
                }
            }

        if (content !== undefined) {

            if (typeof content !== "string") {
    
                throw new BadRequestError("'content' deve ser string")
                }
            }


        if (dislikes !== undefined) {

            if (typeof dislikes !== "number") {
    
                throw new BadRequestError("'dislikes' deve ser number")
                }
            }

        const postDataBase = new PostDataBase()

        const idExists = await postDataBase.findGetPostId(id)

        if (idExists) {

            throw new BadRequestError("'id' do post já existe");
        }

        const postIntance = new Post(
            id,
            creator_id,
            content,
            likes,
            dislikes,
            new Date().toISOString(),
            new Date().toISOString()
        )

        
        const newProduct: TPosts = {
            id: postIntance.getId(),
            creator_id: postIntance.getCreatorId(),
            content: postIntance.getContent(),
            likes: postIntance.getLikes(),
            dislikes: postIntance.getDislikes(),
            created_at: postIntance.getCreatedAt(),
            updated_at: postIntance.getUpdateAt()
        }

        const postOutput = await postDataBase.insertPost(newProduct)

        const output ={
            message: "Post criado com sucesso",
            content: newProduct.content
        }
        
        return output
       
    }

    public getPost = async () =>{
        const postDataBase = new PostDataBase()
    
        const resultPosts = await postDataBase.findGetPost()

        const userDataBase = new UserDataBase()

        const resultUsers = await userDataBase.findGetUsers()

       

        // const resultUser: User[] = resultUsers.map((result)=>
        // new User(
        //   result.id,
        //   result.name,
        //   result.email,
        //   result.password,
        //   result.role,
        //   result.created_at
        // )
        // )
        
        // const resultPost: Post[] = resultPosts.map((result)=>
        // new Post(
        //   result.id,
        //   result.creator_id,
        //   result.content,
        //   result.likes,
        //   result.dislikes,
        //   result.created_at,
        //   result.updated_at 
        // )
        // )

        const resultPost = resultPosts.map((item)=>{
            return {
                id: item.id,
                content: item.content,
                likes: item.likes,
                dislikes: item.dislikes,
                created_at: item.created_at,
                updated_at: item.updated_at,
                creator: 
                  resultado(item.creator_id)  

            }
        })

        function resultado (item: string){
           const resultTable = resultUsers.find((result)=>{
            console.log(result);
            return item === result.id

           })
           
           return {id: resultTable?.id, 
        name: resultTable?.name}
        }
        


       
        return ({Post: resultPost})
    }

    public updatePost = async (input: any, idParams: any)=>{
       
    
        const { id, creator_id, content, likes, dislikes, created_at, updated_at } = input
       

        if (id !== undefined) {

            if (typeof id !== "string") {
                throw new BadRequestError("'id' deve ser string")
            }

            if (id.length < 1) {
                throw new BadRequestError("'id' deve possuir no mínimo 1 caractere")
            }
        }

        if (creator_id !== undefined) {

            if (typeof creator_id !== "string") {
                throw new BadRequestError("'creator_id' deve ser string")
            }
        }

        if (likes !== undefined) {

            if (typeof likes !== "number") {
                throw new BadRequestError("'likes' deve ser number")
            }
        }
        

        if (content !== undefined) {

            if (typeof content !== "string") {
                throw new BadRequestError("'content' deve ser string")
            }

            if (content.length < 1) {
                throw new BadRequestError("'description' deve possuir no mínimo 1 caractere")
            }
        }

        if (dislikes !== undefined) {

            if (typeof dislikes !== "number") {
                throw new BadRequestError("'dislikes' deve ser number")
            }
        }
       
        const postDataBase = new PostDataBase()

        const post = await postDataBase.findPostId(idParams)
       

        if (!post) {
        throw new BadRequestError("'id' não encontrada")
        
        }else {
       

            const postInstance = new Post(
                id,
                creator_id,
                content,
                likes,
                dislikes,
                created_at,
                updated_at
            )


            const updatePosts: TPosts = {
                id: id || postInstance.getId(),
                creator_id: creator_id ||postInstance.getCreatorId(),
                likes: isNaN(likes) ? postInstance.getLikes(): likes,
                content: content || postInstance.getContent(),
                dislikes: isNaN(dislikes) ? postInstance.getDislikes() : dislikes,
                created_at: created_at || postInstance.getCreatedAt(),
                updated_at: updated_at || postInstance.getUpdateAt()
            }
        
console.log(idParams);

        await postDataBase.findUpdatePost({id, creator_id, 
        likes, content, dislikes, created_at, updated_at} as TPosts , idParams)

        const output ={
            message: "Post atualizado com sucesso",
            Post: updatePosts.content
        }

        return (output)
    }}

    public deletePost = async (id: string)=>{
        const postDataBase = new PostDataBase()
   
        const post = await postDataBase.findPostId(id)

        console.log(post);
        

        if (!post) {
            throw new BadRequestError("id não encontrada")
        }

        const deletePost = new Post(
            post.id,
            post.creator_id,
            post.content,
            post.likes,
            post.dislikes,
            post.created_at,
            post.updated_at
        )

        await postDataBase.deletePostId(deletePost.getId())

        const output ={
            message: "Post deletado com sucesso",
            Post: deletePost
        }

        return (output)
    }

    public updatePostId = async (input: any)=>{
        const { likes, dislikes } = input
           
    
        if (likes !== undefined) {

            if (typeof likes !== "number") {
                throw new BadRequestError("'likes' deve ser number")
            }
        }
        

        // if (dislikes !== undefined) {

        //     if (typeof dislikes !== "number") {
        //         throw new BadRequestErro("'dislikes' deve ser number")
        //     }
        // }
        // const postDataBase = new PostDataBase()

        // const [post] = await postDataBase.findPostId()
       

        // if (post) {
        //     const updatePost: TPostsLike = {
        //         likes: isNaN(likes) ? post.likes : likes,
        //         dislikes: isNaN(dislikes) ? post.dislikes : dislikes,
        //     }

    
        // } else {
        //     throw new BadRequestErro("'id' não encontrada")
        // }
    }
}