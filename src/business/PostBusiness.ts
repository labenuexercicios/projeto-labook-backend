import { notDeepEqual } from "assert";
import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/post/createPost.dto";
import { DeletePostInputDTO, DeletePostOutputDTO } from "../dtos/post/deletePost.dto";
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/post/editPost.dto";
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/post/getPosts.dtos";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { Post, PostModel } from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { USER_ROLES } from "../models/User";
import { likeDislikeInputDTO, likeDislikeOutputDTO } from "../dtos/post/likeDislikePost.dto";


export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,

    ) { }

    public createPost = async (input: CreatePostInputDTO): Promise<CreatePostOutputDTO> => {
        const { token, content } = input

        const payload = this.tokenManager.getPayload(token)
        if (!payload) {
            throw new UnauthorizedError("token inválido")
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
        await this.postDatabase.insertPost(post.toDBModel())

        const output: CreatePostOutputDTO = undefined
        return output
    }

    public getPosts = async (input: GetPostsInputDTO): Promise<GetPostsOutputDTO> => {
        const { token } = input
        const payload = this.tokenManager.getPayload(token)
        if (!payload) {
            throw new UnauthorizedError("Token Inválido")
        }
        const postsDB = await this.postDatabase.getPosts()

        const postsModel: PostModel[] = []

        for (let postDB of postsDB) {
            const userDB = await this.userDatabase.findbyId(postDB.creator_id)

            const post = new Post(
                postDB.id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                postDB.updated_at,
                postDB.creator_id,
                userDB.name
            )
            postsModel.push(post.toBusinessModel())
        }

        const output: GetPostsOutputDTO = postsModel
        return output
    }
    public editPost = async (input: EditPostInputDTO): Promise<EditPostOutputDTO> => {
        const { token, content, postId } = input

        const payload = this.tokenManager.getPayload(token)
        if (!payload) {
            throw new UnauthorizedError("Token Inválido")
        }
        const postDB = await this.postDatabase.findById(postId)

        if (!postDB) {
            throw new NotFoundError("id não existe")
        }

        if (payload.id != postDB.creator_id) {
            throw new ForbiddenError("somente quem criou pode editá-lo")
        }
        const userDB = await this.userDatabase.findbyId(postDB.creator_id)

        const post = new Post(
            postDB.id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at,
            postDB.creator_id,
            userDB.name
        )
        post.setContent(content)
        post.setUpdateAt(new Date().toString())
        await this.postDatabase.updatePost(post.toDBModel())

        const output: EditPostOutputDTO = undefined

        return output
    }

    public deletePost = async (input: DeletePostInputDTO): Promise<DeletePostOutputDTO> => {
        const { token, postId } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new NotFoundError("token inválido")
        }

        const postDB = await this.postDatabase.findById(postId)

        if (!postDB) {
            throw new NotFoundError("id não existe ")
        }
        if (payload.role !== USER_ROLES.ADMIN) {
            if (payload.id !== postDB.creator_id) {
                throw new ForbiddenError("somente quem criou o post pode deleta-lo")
            }
        }
        const userDB = await this.userDatabase.findbyId(postDB.creator_id)
        
        const post = new Post(
            postDB.id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at,
            postDB.creator_id,
            userDB.name
        )

        await this.postDatabase.deletePost(post.toDBModel())

        const output: DeletePostOutputDTO = undefined
        return output
    }
    public likeDislike = async (input: likeDislikeInputDTO): Promise<likeDislikeOutputDTO> => {
        const { token, postId, like } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError("token inválido")
        }

        const postDB = await this.postDatabase.findById(postId)

        if (!postDB) {
            throw new NotFoundError("id não existe ")
        }
       
        const userDB = await this.userDatabase.findbyId(postDB.creator_id)
        
        const post = new Post(
            postDB.id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at,
            postDB.creator_id,
            userDB.name
        )

        const likeAsNumber = like?1:0
        const likeDislikeDB = await this.postDatabase.findLikeDislike(postId,payload.id)
            if(likeDislikeDB){
                if(likeDislikeDB.like){
                    if(like){
                        post.removeLike()
                        await this.postDatabase.deletelikeDislike(postId,payload.id) 
                    }else{
                        post.removeLike()
                        post.addDislike()
                        await this.postDatabase.updateLikeDislike(postId,payload.id,likeAsNumber)
                    }
                }else{
                    if(like){
                        post.removeDislike()
                        post.addLike()
                        await this.postDatabase.updateLikeDislike(postId,payload.id,likeAsNumber)
                    }else{
                        post.removeDislike()
                    }
                }
                await this.postDatabase.updatePost(post.toDBModel())
                await this.postDatabase.updateLikeDislike(postId,payload.id,likeAsNumber)
                
            }else{
                like?post.addLike():post.addDislike()
                await this.postDatabase.updatePost(post.toDBModel())
                await this.postDatabase.insertLikeDislike(postId,payload.id,likeAsNumber)
            }
        const output: likeDislikeOutputDTO = undefined
        return output
    }



}   