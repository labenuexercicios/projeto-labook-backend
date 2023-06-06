import { PostDatabase } from "../database/PostDatabase";
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/post/createPost.dto";
import { DeletePostInputDTO, DeletePostOutputDTO } from "../dtos/post/deletePost.dto";
import { EditPostOutputDTO, EditPostInputDTO } from "../dtos/post/editPost.dto";
import { GetPostInputDTO, GetPostOutputDTO } from "../dtos/post/getPost.dto";
import { LikeOrDislikePostInputDTO, LikeOrDislikePostOutputDTO } from "../dtos/post/likeOrDislikePost.dto";
import { ForbiddenError } from "../erros/ForbiddenError";
import { NotFoundError } from "../erros/NotFoundError";
import { UnauthorizedError } from "../erros/UnauthorizedError";
import { LikeDislikeDB, POST_LIKE, Post } from "../models/Post";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ){}
    
    public createPost = async (
        input: CreatePostInputDTO
      
    ): Promise<CreatePostOutputDTO> => {
       const {content, token} = input 

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const id = this.idGenerator.generate()


        const post = new Post(
            id,
            content,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString(),
            payload.id,
            payload.name
        )

        const postDB = post.toDBModel()
        await this.postDatabase.insertPost(postDB)

        const output: CreatePostOutputDTO = undefined

        return output

    }

    public getPost = async (
        input: GetPostInputDTO
    ): Promise<GetPostOutputDTO> => {
        const { token} = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }
 
        const postDBwithCreatorName = await this.postDatabase.getPosWithCreatorName()

        const post = postDBwithCreatorName.map((postWithCreatorName) => {
            const posts = new Post(
                postWithCreatorName.id,
                postWithCreatorName.content,
                postWithCreatorName.likes,
                postWithCreatorName.dislikes,
                postWithCreatorName.created_at,
                postWithCreatorName.updated_at,
                postWithCreatorName.creator_id,
                postWithCreatorName.creator_name
            )

                return posts.toBusinessModel()

        } )

        const output: GetPostOutputDTO = post

        return output

    }

    public editPost = async (
        input: EditPostInputDTO
      
    ): Promise<EditPostOutputDTO> => {
       const { content , token, idToEdit} = input 

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const postDB = await this.postDatabase.findPostById(idToEdit)

        if (!postDB) {
            throw  new NotFoundError("Não exste post com esse ID");
        }

        if (payload.id !== postDB.creator_id) {
            throw new ForbiddenError("somente quem criou post pode alterar o mesmo")
          }

          const post = new Post(
            postDB.id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at,
            postDB.creator_id,
            payload.name
          )


        post.setContent(content)

          const updatedPostDB = post.toDBModel()
          await this.postDatabase.updatePost(updatedPostDB)
      
          const output: EditPostOutputDTO = undefined
      
          return output
        }
        
        public deletePost = async (
            input: DeletePostInputDTO
          
        ): Promise<DeletePostOutputDTO> => {
           const { token, idToDelete }  = input 
    
            const payload = this.tokenManager.getPayload(token)
    
            if (!payload) {
                throw new UnauthorizedError()
            }
    
            const postDB = await this.postDatabase.findPostById(idToDelete)
    
            if (!postDB) {
                throw  new NotFoundError("Não exste post com esse ID");
            }

            if (payload.role !== USER_ROLES.ADMIN){
                if (payload.id !== postDB.creator_id) {
                    throw new ForbiddenError("somente quem criou post pode alterar o mesmo")
                }
            }
     
              await this.postDatabase.deletePostById(idToDelete)
          
              const output: DeletePostOutputDTO = undefined
          
              return output
            }



    // public deletePost = async (
    //     input: DeletePostInputDTO
    //     ): Promise<DeletePostOutputDTO> => {
    //    const { token, idToDelete }  = input 

    //     const payload = this.tokenManager.getPayload(token)

    //     if (!payload) {
    //         throw new UnauthorizedError()
    //     }

    //     const postDB = await this.postDatabase.findPostById(idToDelete)

    //     if (!postDB) {
    //         throw  new NotFoundError("Não exste post com esse ID");
    //     }

    //     if (payload.role !== USER_ROLES.ADMIN){
    //         if (payload.id !== postDB.creator_id) {
    //             throw new ForbiddenError("somente quem criou post pode alterar o mesmo")
    //         }
    //     }
 
    //       await this.postDatabase.deletePostById(idToDelete)
      
    //       const output: DeletePostOutputDTO = undefined
      
    //       return output
    //     }





        public likeOrDislikePost = async (
            input: LikeOrDislikePostInputDTO
          
        ): Promise<LikeOrDislikePostOutputDTO> => {
           const { token, like, postId  }  = input 
    
            const payload = this.tokenManager.getPayload(token)
    
            if (!payload) {
                throw new UnauthorizedError()
            }

        const postDBwithCreatorName = 
            await this.postDatabase.findPostWithCreatorNameById(postId)
    
        if(!postDBwithCreatorName){
            throw new NotFoundError("não existe Post com essa Id")
        }

        const post = new Post(
            postDBwithCreatorName.id,
            postDBwithCreatorName.content,
            postDBwithCreatorName.likes,
            postDBwithCreatorName.dislikes,
            postDBwithCreatorName.created_at,
            postDBwithCreatorName.updated_at,
            postDBwithCreatorName.creator_id,
            postDBwithCreatorName.creator_name
          )

          const likesSQLite = like ? 1 : 0

          const likeDislikeDB: LikeDislikeDB = {
                user_id: payload.id,
                post_id: postId,
                like: likesSQLite

          }
      
          const likeDislikeExists = await this.postDatabase.findLikesDislike(likeDislikeDB)

          if(likeDislikeExists === POST_LIKE.ALREADY_LIKED) {
            if (like) {
                await this.postDatabase.removeLikeDislike(likeDislikeDB)
                post.removeLike()
              } else {
                await this.postDatabase.updateLikeDislike(likeDislikeDB)
                post.removeLike()
                post.addDislike()
              }
        
            } else if (likeDislikeExists === POST_LIKE.ALREADY_DISLIKED) {
              if (like === false) {
                await this.postDatabase.removeLikeDislike(likeDislikeDB)
                post.removeDislike()
              } else {
                await this.postDatabase.updateLikeDislike(likeDislikeDB)
                post.removeDislike()
                post.addLike()
              }
        
            } else {
              await this.postDatabase.insertLikeDislike(likeDislikeDB)
              like ? post.addLike() : post.addDislike()
            }
        
            const updatedPostDB = post.toDBModel()
            await this.postDatabase.updatePost(updatedPostDB)
        
            const output: LikeOrDislikePostOutputDTO = undefined
        
            return output
          }
        }
        