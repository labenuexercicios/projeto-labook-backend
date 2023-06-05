import { Request, Response } from "express";
import { PostDataBase } from "../database/PostDataBase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import {
  CreatePostInputDTO,
  CreatePostOutputDTO,
} from "../DTOs/post/createPost.dto";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { LikeDislikeDB, POST_LIKE, Post, PostModel } from "../models/Post";
import { access } from "fs";
import { GetPostInputDTO, GetPostOutputDTO } from "../DTOs/post/getPost.dto";
import { EditPostInputDTO, EditPostOutputDTO } from "../DTOs/post/editPost.dto";
import { NotFoundError } from "../errors/NotFoundError";
import { ForbiddenError } from "../errors/ForbiddenError";
import {
  DeletePostInputDTO,
  DeletePostOutputDTO,
} from "../DTOs/post/deletPost.dto";
import { USER_ROLES } from "../models/User";
import {
  LikeOrDislakePostInputDTO,
  LikeOrDislikePostOutputDTO,
} from "../DTOs/post/likeOrDislikePost.dto";

export class PostBusiness {
  constructor(
    private postDatabase: PostDataBase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  public createPost = async (
    input: CreatePostInputDTO
  ): Promise<CreatePostOutputDTO> => {
    const { content, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    const id = this.idGenerator.generate();

    const post = new Post(
      id,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString(),
      payload.id,
      payload.name
    );

    const postDB = post.toDBModel();
    await this.postDatabase.insertPost(postDB);

    const result: CreatePostOutputDTO = undefined;

    return result;
  };

  public getPost = async (
    input: GetPostInputDTO
  ): Promise<GetPostOutputDTO> => {
    const { token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    const postsDBwithCreatorName =
      await this.postDatabase.getPostWithNameCreator();

    const posts = postsDBwithCreatorName.map((postsDBwithCreatorName) => {
      const post = new Post(
        postsDBwithCreatorName.id,
        postsDBwithCreatorName.content,
        postsDBwithCreatorName.likes,
        postsDBwithCreatorName.dislikes,
        postsDBwithCreatorName.created_at,
        postsDBwithCreatorName.updated_at,
        postsDBwithCreatorName.creator_id,
        postsDBwithCreatorName.creator_name
      );

      return post.toPostModel();
    });

    const output: GetPostOutputDTO = posts;

    return output;
  };

  public editPost = async (
    input: EditPostInputDTO
  ): Promise<EditPostOutputDTO> => {
    const { token, idToEdit, content } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    const postDB = await this.postDatabase.findPostById(idToEdit);

    if (!postDB) {
      throw new NotFoundError("Post com id não existe");
    }

    if (payload.id !== postDB.creator_id) {
      throw new ForbiddenError("somente quem criou o post pode editá-la");
    }

    const post = new Post(
      postDB.id,
      content,
      postDB.likes,
      postDB.dislikes,
      postDB.created_at,
      postDB.updated_at,
      postDB.creator_id,
      payload.name
    );

    post.setContent(content);

    const updatePostDB = post.toDBModel();
    await this.postDatabase.updatePost(updatePostDB);

    const output: EditPostOutputDTO = undefined;

    return output;
  };

  public deletePost = async (
    input: DeletePostInputDTO
  ): Promise<EditPostOutputDTO> => {
    const { token, idToDelete } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    const postDB = await this.postDatabase.findPostById(idToDelete);
 

    if (!postDB) {
      throw new NotFoundError("Post com o Id fornecido não encontrado");
    }

    if (payload.role !== USER_ROLES.ADMIN) {
      if (payload.id !== postDB.creator_id) {
        throw new ForbiddenError("Somente quem criou o Post pode deletá-lo");
      }
    }

    await this.postDatabase.deletePostById(idToDelete);

    const output: DeletePostOutputDTO = undefined;

    return output;
  };

  public likeOrDislikesPost = async (
    input: LikeOrDislakePostInputDTO
  ): Promise<LikeOrDislikePostOutputDTO> => {
    const { postId, token, like } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }
    const likeOrDislikePost =
      await this.postDatabase.getPostWithNameCreatorById(postId);

    if (!likeOrDislikePost) {
      throw new NotFoundError("Post com o id fornecido não existe!");
    }

    const post = new Post(
      likeOrDislikePost.id,
      likeOrDislikePost.content,
      likeOrDislikePost.likes,
      likeOrDislikePost.dislikes,
      likeOrDislikePost.created_at,
      likeOrDislikePost.updated_at,
      likeOrDislikePost.creator_id,
      likeOrDislikePost.creator_name
    );

    const likeSQLite = like ? 1 : 0;

    const likeDislikeDB: LikeDislikeDB = {
      user_id: payload.id,
      post_id: postId,
      like: likeSQLite,
    };

    const likeDislikeExists = await this.postDatabase.findLikeDislike(
      likeDislikeDB
    );

    if (likeDislikeExists === POST_LIKE.ALREADY_LIKED) {
      if (like) {
        await this.postDatabase.removeLikeDislike(likeDislikeDB);
        post.removeLike();
      } else {
        await this.postDatabase.updateLikeDislike(likeDislikeDB);
        post.removeLike();
        post.addDislike();
      }
    } else if (likeDislikeExists === POST_LIKE.ALREADY_DISLIKED) {
      if (like === false) {
        await this.postDatabase.removeLikeDislike(likeDislikeDB);
        post.removeDislike();
      } else {
        await this.postDatabase.updateLikeDislike(likeDislikeDB);
        post.removeDislike();
        post.addLike();
      }
    } else {
      await this.postDatabase.insertLikeDislike(likeDislikeDB);
      like ? post.addLike() : post.addDislike();
    }

    const updatedPostDB = post.toDBModel();
    await this.postDatabase.updatePost(updatedPostDB);

    const output: LikeOrDislikePostOutputDTO = undefined;

    return output;
  };
}