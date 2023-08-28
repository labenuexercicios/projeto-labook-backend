
import { PostDatabase } from "../database/PostDatabase";
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/post/createPostDTO";
import { DeletePostInputDTO, DeletePostOutputDTO } from "../dtos/post/deletePostDTO";
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/post/editPostDTO";
import { LikeDislikeInputDTO } from "../dtos/post/likeDislikeDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { LikeDislikeDB, POST_LIKE, Post, PostDB, PostWithCreatorDB } from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { UserDatabase } from "../database/UserDatabase";
import { USER_ROLES } from "../models/User";
import { GetPostInputDTO, GetPostOutputDTO } from "../dtos/post/getPostDTO";

export class PostBusiness {
    constructor (
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private userdatabase: UserDatabase
    ){}
    public createPost = async (input: CreatePostInputDTO): Promise<CreatePostOutputDTO> => {
        const { content, token } = input

        if(token === undefined) {
            throw new BadRequestError("'token' ausente.")
        }

        if(typeof token !== "string") {
            throw new BadRequestError("'token' deve ser do tipo string.")
        }

        if(token === null) {
            throw new BadRequestError("'token' deve ser informado..")
        }
        //const postDBExists = await this.postDatabase.findPostById(id)

        /* if (postDBExists) {
            throw new BadRequestError("id já existe.")
        } */
        const payload = this.tokenManager.getPayload(token)

        if(payload ==null){
            throw new BadRequestError("token inválido")
        }

        const id = this.idGenerator.generate()
        const creatorId = payload.id
        const creatorName = payload.name
        let newLikes = 0
        let newDislikes = 0
        const newPost = new Post(
            id,
            creatorId,
            content,
            newLikes,
            newDislikes,
            new Date().toISOString(),
            new Date().toISOString(),
            creatorName
        )
        const newPostDB = newPost.toDBModel()
        await this.postDatabase.insertPost(newPostDB)

        const output:CreatePostOutputDTO = {
            message: "Post cadastrado com sucesso!",
            post: {
                
                creator_id: newPost.getCreatorId(),
                content: newPost.getContent(),
                newLikes: newPost.getLikes(),
                newDislikes: newPost.getDislikes(),
                createdAt: newPost.getCreatedAt(),
                updatedAt: newPost.getUpdatedAt()
            }
        }
        return output
    }

    public getPosts = async (input: GetPostInputDTO):Promise<GetPostOutputDTO> => {
       
        const { token } = input
        console.log(token)
        if(token === undefined) {
            throw new BadRequestError("'token' deve ser informado.")
        }

        const payload = this.tokenManager.getPayload(token)

        if(payload === null) {
            throw new BadRequestError("'token' inválido.")
        }

        const postsWithCreatorDB: PostWithCreatorDB[] = await this.postDatabase.getPostWithCreator()

        const posts = postsWithCreatorDB.map((postsWithCreatorDB) => {
            const post = new Post(
                postsWithCreatorDB.id,
                postsWithCreatorDB.creator_id,
                postsWithCreatorDB.content,
                postsWithCreatorDB.likes,
                postsWithCreatorDB.dislikes,
                postsWithCreatorDB.created_at,
                postsWithCreatorDB.updated_at,
                postsWithCreatorDB.creator_name
            )

            return post.toBusinessModel()
        })
        const output: GetPostOutputDTO = posts
        return output
    }

    public editPosts = async (input:EditPostInputDTO):Promise<EditPostOutputDTO> => {
        const {idToEdit, content, token} = input

        const postToEditDB = await this.postDatabase.findPostById(idToEdit)
        if (!postToEditDB) {
            throw new NotFoundError("id do post para edição não existe.")
        }
        const payload = this.tokenManager.getPayload(token)

        if(payload ==null){
            throw new BadRequestError("token inválido")
        }

        const creatorName = payload.name
        const post = new Post(
            postToEditDB.id,
            postToEditDB.creator_id,
            postToEditDB.content,
            postToEditDB.likes,
            postToEditDB.dislikes,
            postToEditDB.created_at,
            postToEditDB.updated_at,
            creatorName
        )
        content && post.setContent(content)

        const updatedPostDB: PostDB = {
            id: post.getId(),
            creator_id: post.getCreatorId(),
            content: post.getContent(),
            likes: post.getLikes(),
            dislikes: post.getDislikes(),
            created_at: post.getCreatedAt(),
            updated_at: post.getUpdatedAt()
        }
        await this.postDatabase.updatePost(idToEdit, updatedPostDB)
        const output:EditPostOutputDTO = {
            message: 'Post editado com sucesso!',
            post: {
                idToEdit: post.getId(),
                creator_id: post.getCreatorId(),
                content: post.getContent(),
                likes: post.getLikes(),
                dislikes: post.getDislikes(),
                createdAt: post.getCreatedAt(),
                updatedAt: post.getUpdatedAt()
            }
        }
        return output
    }

    public deletePosts = async (input: DeletePostInputDTO):Promise<DeletePostOutputDTO> => {
        const { idToDelete, token } = input
        const postToDeleteDB = await this.postDatabase.findPostById(idToDelete)

        if (!postToDeleteDB) {
            throw new NotFoundError("id do post não foi encontrado.")
        }
        const payload = this.tokenManager.getPayload(token)

        if(payload ==null){
            throw new BadRequestError("token inválido")
        }
        const postDB = await this.postDatabase.findPostById(idToDelete)

        if (!postDB) {

            throw new NotFoundError("Id não encontrado")
        }
        const creatorId = payload.id

        if (
            payload.role !== USER_ROLES.ADMIN &&
            postDB.creator_id !== creatorId) {
            throw new BadRequestError("somente quem criou o post pode deletá-la")
        }
        await this.postDatabase.deletePostById(postToDeleteDB.id)

        const output:DeletePostOutputDTO = {
            message:"Post deletado com sucesso.",
        }
        return output
    }

    public likeDislikePost = async (input: LikeDislikeInputDTO): Promise<void> => {
        const {idToLikeDislike, token, like} = input

        if (token == undefined){
            throw new BadRequestError("'token' ausente.")
        }
        if (typeof token !== "string"){
            throw new BadRequestError("'token' deve ser no formato string.")
        }
        if (token == null){
            throw new BadRequestError("'token' deve ser informado.")
        }
        
        const payload = this.tokenManager.getPayload(token)
        if (payload == null){
            throw new BadRequestError("'token' inválido.")
        }
        if (typeof like !== "boolean"){
            throw new BadRequestError("'like' deve ser no formato booleano.")
        }

        const postWithCreatorDB = await this.postDatabase.findPostByCreatorId(idToLikeDislike)
        if (!postWithCreatorDB){
            throw new NotFoundError("'Id' não encontrado.")
        }

        const userId = payload.id
        const likeSQLite = like ? 1:0
        const likeDislikeDB: LikeDislikeDB = {
            user_id: userId,
            post_id: postWithCreatorDB.id,
            like: likeSQLite
        }
        const post = new Post(
            postWithCreatorDB.id,
            postWithCreatorDB.creator_id,
            postWithCreatorDB.content,
            postWithCreatorDB.likes,
            postWithCreatorDB.dislikes,
            postWithCreatorDB.created_at,
            postWithCreatorDB.updated_at,
            postWithCreatorDB.creator_name
        )

        const likeDislikeExist = await this.postDatabase.findLikeDislike(likeDislikeDB)
        if (likeDislikeExist == POST_LIKE.ALREADY_LIKED) {
            if (like) {
                await this.postDatabase.removeLikeDislike(likeDislikeDB)
                post.removeLike()
            } else {
                await this.postDatabase.updateLikeDislike(likeDislikeDB)
                post.removeLike()
                post.addDislike()
            }
        } else if (likeDislikeExist === POST_LIKE.ALREADY_DISLIKED) {
            if (like) {
                await this.postDatabase.updateLikeDislike(likeDislikeDB)
                post.removeDislike()
                post.addLike()
            } else {
                await this.postDatabase.removeLikeDislike(likeDislikeDB)
                post.removeDislike()
            }
        } else {

            await this.postDatabase.likeDislikePost(likeDislikeDB)

            like ? post.addLike() : post.addDislike()

        }

        const updatePostDB = post.toDBModel()

        await this.postDatabase.updatePost(idToLikeDislike, updatePostDB)
    }
        
    
}