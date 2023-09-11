import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { CreatePostInputDTO, CreatePostOutputDTO } from '../dtos/poust/createPost.dto';
import { DeletePostInputDTO, DeletePostOutputDTO } from '../dtos/poust/deletePost.dto';
import { EditPostInputDTO, EditPostOutputDTO } from '../dtos/poust/editPost.dto';
import { GetPostsInputDTO, GetPostsOutputDTO } from '../dtos/poust/getPost.dto';
import { LikeDislikeInputDTO, LikeDislikeOutputDTO } from '../dtos/poust/likeDislike.dto';
import { BadRequestError } from "../errors/BadRequestError";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { LikeDislikeDB } from "../models/Post";
import { POST_LIKE, Post, PostModel } from "../models/Post";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenMananger } from '../services/TokenManager';


export class PostBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private postDatabase: PostDatabase,
    private tokenManager: TokenMananger,
    private idGenerator: IdGenerator
  ){}

    public getAllPosts = async (input: GetPostsInputDTO): Promise<GetPostsOutputDTO> => {
      const { token } = input
      const payload = this.tokenManager.getPaylod(token)
      if (!payload) {
				throw new UnauthorizedError()
		  }
      if (payload.role !== USER_ROLES.ADMIN) {
        throw new BadRequestError("Only admins can access this resource")
      }
      const postsDB = await this.postDatabase.getAllPosts()
          const postsModel: PostModel[] = []
          for (let postDB of postsDB){
            const creatorDB = await this.userDatabase.findUserById(postDB.creator_id)
            if(!creatorDB){
                throw new NotFoundError("User not found")
            }
            const post = new Post(
              postDB.id,
              postDB.content,
              postDB.likes,
              postDB.dislikes,
              postDB.createdAt,
              postDB.updatedAt,
              creatorDB.id,
              creatorDB.name
            )
            postsModel.push(post.toPostModel())
          }
          const output: GetPostsOutputDTO = postsModel
          return output
      };

      public createPost = async (input: CreatePostInputDTO): Promise<CreatePostOutputDTO> => {
        const {token, content } = input 
        const payload = this.tokenManager.getPaylod(token)
        console.log(payload)
        if(!payload){
          throw new UnauthorizedError()
          
        }
        
        const id = this.idGenerator.generateId()
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
        const postDB = post.toPostDB()
        await this.postDatabase.insertPost(postDB)
        const output: CreatePostOutputDTO = undefined
        return output
        
    };


     

      public editPost = async (input: EditPostInputDTO): Promise<EditPostOutputDTO> => {
          const { idToEdit, token, content } = input;
          const payload = this.tokenManager.getPaylod(token)
          if (!payload) {
            throw new UnauthorizedError()
          }
          const postToEdit = await this.postDatabase.getPostById(idToEdit);
          if (!postToEdit) {
            throw new NotFoundError('Post not found'); 
          }
          if (payload.id !== postToEdit.creator_id) {
            throw new ForbiddenError('Only the creator can edit the post')
          }
          const post = new Post (
            postToEdit.id,
            postToEdit.content,
            postToEdit.likes,
            postToEdit.dislikes,
            postToEdit.createdAt,
            postToEdit.updatedAt,
            postToEdit.creator_id,
            payload.name
          );
          
          post.setContent(content)
          const updatedPost = post.toPostDB()
          await this.postDatabase.updatePost(updatedPost)
          const output: EditPostOutputDTO = undefined
          return output

      };

      public deletePost = async (input: DeletePostInputDTO): Promise<DeletePostOutputDTO> => {
        const {token, id} = input
        const payload = this.tokenManager.getPaylod(token)
          if (!payload) {
            throw new UnauthorizedError()
          }
        const postToDelete = await this.postDatabase.getPostById(id);
        if (!postToDelete) {
          throw new NotFoundError('Post not found');
        }
        if (payload.role !== USER_ROLES.ADMIN){
          if (payload.id !== postToDelete.creator_id) {
            throw new ForbiddenError("Only the creator of the post can delete it")
          }
  
        }
        await this.postDatabase.deletePostById(id);
        const output: DeletePostOutputDTO = undefined
        return output;
      };


      public likeDislikePost = async (input: LikeDislikeInputDTO): Promise<LikeDislikeOutputDTO> => {
        const { token, postId, like } = input;
        const payload = this.tokenManager.getPaylod(token)
        if (!payload){
          throw new UnauthorizedError()
        }
        const postDBWithCreatorName = 
        await this.postDatabase.findPostWithCreatorById(postId) 
        if (!postDBWithCreatorName){
          throw new NotFoundError("The post does not exist")
        }
        if (postDBWithCreatorName.creator_id === payload.id) {
          throw new BadRequestError("The creator of the post cannot like or dislike their own post");
        }
        const post = new Post(
          postDBWithCreatorName.id,
          postDBWithCreatorName.content,
          postDBWithCreatorName.likes,
          postDBWithCreatorName.dislikes,
          postDBWithCreatorName.createdAt,
          postDBWithCreatorName.updatedAt,
          postDBWithCreatorName.creator_id,
          postDBWithCreatorName.creator_name
        )
        const likeSQlite = like? 1:0
        const likeDislikeDB: LikeDislikeDB = {
          user_id: payload.id,
          post_id: postId,
          like: likeSQlite,
        }
        const likeDislikeExists = await this.postDatabase.findLikeDislike(likeDislikeDB)
        if(likeDislikeExists === POST_LIKE.ALREADY_LIKED) {
          if(like) {
            await this.postDatabase.deleteLikeDislike(likeDislikeDB)
            post.removeLike()
          } else {
            await this.postDatabase.updateLikeDislike(likeDislikeDB)
            post.removeLike()
            post.addDislike()
          }
        } else if(likeDislikeExists === POST_LIKE.ALREADY_DISLIKED) { 
          if(like === false) {
            await this.postDatabase.deleteLikeDislike(likeDislikeDB)
            post.removeDislike()
          } else {
            await this.postDatabase.updateLikeDislike(likeDislikeDB)
            post.removeDislike()
            post.addLike()
          }
        } else {
          await this.postDatabase.insertLikeDislike(likeDislikeDB)
          like? post.addLike() : post.addDislike()
        }
        const updatedPostDB = post.toPostDB()
        await this.postDatabase.updatePost(updatedPostDB)
        const output: LikeDislikeOutputDTO= undefined
        return output
      };
    }