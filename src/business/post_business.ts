import { CreatePostOutputDTO } from "./../dtos/posts/create_posts.dto";
import { PostsDatabase } from "../database/post_database";
import { Posts, likeDeslikeDB, POST_LIKE } from "../models/Post";
import { IdGenerator } from "../service/id_generator";
import { TokenManager } from "../service/token_manager";
import { BadRequestError } from "../error/bad_request_error";
import {
  GetPostsInputDTO,
  GetPostsOutputDTO,
} from "../dtos/posts/get_posts.dto";
import {
  EditPostsInputDTO,
  EditPostsoutputDTO,
} from "../dtos/posts/edit_posts.dto";
import { NotFoundError } from "../error/not_found_error";
import { CreatePostInputDTO } from "../dtos/posts/create_posts.dto";
import { UserDatabase } from "../database/users_database";
import {
  DeletePostsInputDTO,
  DeletePostsoutputDTO,
} from "../dtos/posts/delete_posts.dto";
import { USER_ROLES } from "../models/user";
import {
  LikeDislikeOutputDTO,
  LikeDislikeinputDTO,
} from "../dtos/posts/like_dislike.dto";

export class PostsBusiness {
  constructor(
    public postsDatabase: PostsDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    public userDatabase: UserDatabase
  ) {}
  public createPost = async (
    input: CreatePostInputDTO
  ): Promise<CreatePostOutputDTO> => {
    const { content, token } = input;
    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError("token invalido");
    }

    const id = this.idGenerator.generatorId();

    const newPost = new Posts(
      id,
      payload.id,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString(),
    );

    const newPostToDB = newPost.toDBModel();

    await this.postsDatabase.insertPost(newPostToDB);

    const output: CreatePostOutputDTO = undefined;

    return output;
  };

  public getPost = async (
    input: GetPostsInputDTO
  ): Promise<GetPostsOutputDTO> => {
    const { token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("token invalid");
    }

    const postsDB = await this.postsDatabase.getPosts();

    const getPosts = postsDB.map((postsDB) => {
      const post = new Posts(
        postsDB.id,
        postsDB.creator_id,
        postsDB.content,
        postsDB.likes,
        postsDB.dislikes,
        postsDB.created_at,
        postsDB.updated_at
      );
      return post.toBusinessModel();
    });

    const getPostCreatorId = getPosts.map((post) => post.creatorId);

    const userName: any = [];

    for (let i = 0; i < getPostCreatorId.length; i++) {
      const result = await this.userDatabase.returnUserName(
        getPostCreatorId[i]
      );

      userName.push(result);
    }

    const post = getPosts.map((post, index) => {
      const postModel = {
        id: post.id,
        content: post.content,
        likes: post.likes,
        dislikes: post.dislike,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        creator: {
          id: post.creatorId,
          name: userName[index],
        },
      };
      return postModel;
    });

    const output: GetPostsOutputDTO = post;

    return output;
  };

  public editPosts = async (
    input: EditPostsInputDTO
  ): Promise<EditPostsoutputDTO> => {
    const { idToEdit, content, token } = input;

    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError("token invalid");
    }

    const postToEditDB = await this.postsDatabase.findPostById(idToEdit);

    if (!postToEditDB) {
      throw new NotFoundError("'id' not found");
    }

    console.log(postToEditDB.creator_id)
    const updated_at = new Date().toISOString();
    const postsDB = await this.postsDatabase.getPosts();
    const post = new Posts(
      postToEditDB.id,
      postToEditDB.creator_id,
      content,
      postToEditDB.likes,
      postToEditDB.dislikes,
      postToEditDB.created_at,
      updated_at
    );
    const updatePost = post.toDBModel();

   

    if (payload.id !== postToEditDB.creator_id) {
      throw new BadRequestError(
        "You do not have permission to edit this post."
      );
    }

    await this.postsDatabase.updatePost(updatePost);

    const output: EditPostsoutputDTO = undefined;
    return output;
  };




  public deletePost = async (
    input: DeletePostsInputDTO
  ): Promise<DeletePostsoutputDTO> => {
    const { idToDelete, token } = input;

    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError("token invalid");
    }

    const postsDBFindById = await this.postsDatabase.findPostById(idToDelete);

    if (!postsDBFindById) {
      throw new BadRequestError("'id' to delete not found");
    }

    const postsDB = await this.postsDatabase.getPosts();

    const postToDeleteDB = await this.postsDatabase.findPostById(idToDelete);

    if (!postToDeleteDB) {
      throw new NotFoundError("'id' not found");
    }

    const getPosts = postsDB.map((postsDB) => {
      const post = new Posts(
        postsDB.id,
        postsDB.creator_id,
        postsDB.content,
        postsDB.likes,
        postsDB.dislikes,
        postsDB.created_at,
        postsDB.updated_at
      );
      return post.toBusinessModel();
    });

    

    if (payload.id !== postToDeleteDB.creator_id) {
      if (payload.role !== USER_ROLES.ADMIN) {
        throw new BadRequestError(
          "You do not have permission to edit this post."
        );
      }
    }
    
    await this.postsDatabase.deletePostById(idToDelete);

    const output: DeletePostsoutputDTO = undefined;

    return output;
  };

   public likeDislikePost = async (input:LikeDislikeinputDTO):Promise<LikeDislikeOutputDTO>=>{
    const {idPost, token , like}= input

    const payLoad = this.tokenManager.getPayload(token)

    if(!payLoad) {
      throw new BadRequestError('"Token" invalid')
    }
    const postDB =  await this.postsDatabase.findPostById(idPost)

    if(!postDB){
      throw new NotFoundError('"idPost" not found')
    }
  

    const post = new Posts(
      postDB.id,
      postDB.creator_id,
      postDB.content,
      postDB.likes,
      postDB.dislikes,
      postDB.created_at,
      postDB.updated_at
    )
    
    const likeSQlite = like ? 1 : 0;

    const likeDislikeDB: likeDeslikeDB= {
      user_id: payLoad.id,
      post_id: idPost,
      like: likeSQlite,
    };
  
    const likeDislikeExists =
      await this.postsDatabase.findLikeDislike(likeDislikeDB);
  
    if (likeDislikeExists === POST_LIKE.ALREADY_LIKED) {
      if (like) {
        await this.postsDatabase.removeLikeDislike(likeDislikeDB);
        post.removeLike();
      } else {
        await this.postsDatabase.updateLikeDislike(likeDislikeDB);
        post.removeLike();
        post.addDislikes();
      }
    } else if (likeDislikeExists === POST_LIKE.ALREADY_DISLIKED) {
      if (like === false) {
        await this.postsDatabase.removeLikeDislike(likeDislikeDB);
        post.removeDislikes();
      } else {
        await this.postsDatabase.updateLikeDislike(likeDislikeDB);
        post.removeDislikes();
        post.addLike();
      }
    } else {
      await this.postsDatabase.insertLikeDislike(likeDislikeDB);
      like ? post.addLike() : post.addDislikes();
    }
  
    const updatedPostDB = post.toDBModel();
    await this.postsDatabase.updatePost(updatedPostDB);
  
    const output: LikeDislikeOutputDTO= undefined;
  
    return output;

  } 

  
}