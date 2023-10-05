import { likeDislikeDB, postDB } from "../types"
import { badRequestError } from "../error/badRequest"
import { USER_ROLES } from "../models/modelUser"
import { generatorId } from "../service/generatorId"
import { tokenManager } from "../service/tokenManager"
import { databasePost} from "../../src/database/postData"
import { postCreateInputDTO } from "../endpoints/createPost"
import { postDeleteInputDTO } from "../endpoints/deletePost"
import { postGetAllOutputDTO } from "../endpoints/getPost"
import { postLikeDislikeInputDTO } from "../endpoints/lileDislikePost"
import { postUpdateInputDTO } from "../endpoints/editPost"
import { tokenCheckInputDTO } from "../endpoints/checkToken"

export class postBusiness {
    constructor(
        private databasePost: databasePost,
        private generatorId: generatorId,
        private tokenManager: tokenManager
    ) { }


    public create = async (input: postCreateInputDTO): Promise<void> => {
        const id = this.generatorId.generate()

        const { content, token } = input

        const result = this.tokenManager.getPayload(token)

        if (!result) {
            throw new Error("invalid token.")
        }

        const postCreateDB: postDB = {
            id,
            content,
            creator_id: result.id,
            likes: 0,
            dislikes: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }

        await this.databasePost.createPost(postCreateDB)
    }

    public getAll = async (input: tokenCheckInputDTO): Promise<postGetAllOutputDTO[]> => {

        const { token } = input

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new badRequestError("invalid token.")
        }

        const result = await this.databasePost.findPost()

        const output: postGetAllOutputDTO[] = result.map((item) => ({
            id: item.id,
            content: item.content,
            likes: item.likes,
            dislikes: item.dislikes,
            created_at: item.created_at,
            updated_at: item.updated_at,
            creator: {
                id: item.userId,
                name: item.userName
            }
        }));

        return output
    }

    public update = async (input: postUpdateInputDTO) => {

        const {
            id,
            content,
            token
        } = input

        const payload = this.tokenManager.getPayload(token)
        if (payload === null) {
            throw new badRequestError("invalid token.")
        }
        const postDB = await this.databasePost.findPostById(id)

        if (!postDB) {
            throw new badRequestError("invalid id.")
        }


        if (payload.id !== postDB.creator_id) {
            throw new badRequestError("incorrect id.")
        }

        await this.databasePost.updatePost(id, content)
    }

    public delete = async (input: postDeleteInputDTO) => {

        const { id, token } = input

        const payload = this.tokenManager.getPayload(token)
        if (payload === null) {
            throw new badRequestError("invalid token.")
        }

        const result = await this.databasePost.findPostById(id)

        if (!result) {
            throw new badRequestError("'Id' not found.")
        }

        if (payload.id === result.creator_id || payload.role === USER_ROLES.ADMIN) {
            await this.databasePost.delete(id)
        }else{
            throw new badRequestError("access denied")
        }

    }

    public likeDislike = async(input: postLikeDislikeInputDTO) =>{
        const {id: postId, like, token} = input

        const isLiked = Number(like)
        
        const payload = this.tokenManager.getPayload(token)
        
        if (payload === null) {
            throw new badRequestError("invalid token.")
        }
        const userId = payload.id

        const result = await this.databasePost.findPostById(postId)

        if(typeof result === 'undefined'){
            throw new badRequestError("Post not found.")
        }
        
        if(userId === result?.creator_id){
            throw new badRequestError("you cannot like your own post.")
        }
    
        const likeDislikeDB: likeDislikeDB = {
            post_id: postId,
            user_id: userId,
            like: isLiked
        }

        const likeExist = await this.databasePost.findLikeDislike(postId, userId)

        if(!likeExist){
            await this.databasePost.createLikeDislike(likeDislikeDB)
            if(isLiked === 1){
                await this.databasePost.incrementLike(postId)
            }else{
                await this.databasePost.incrementDislike(postId)
            }
        }else{
            if(isLiked !== likeExist.like){
                await this.databasePost.createLikeDislike(likeDislikeDB)
                if(isLiked === 1){
                    await this.databasePost.revertDislikeToLike(postId)
                }else{
                    await this.databasePost.revertLikeToDislike(postId)
                }
            }else{
                await this.databasePost.deleteLikeDislike(postId, userId)

                if(isLiked === 1){
                    await this.databasePost.decrementLike(postId)
                }else{
                    await this.databasePost.decrementDislike(postId) 
                }
            }
            
        }
        
    }
}