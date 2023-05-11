import { PostDatabase } from "../database/PostDatabase";
import {
  CreatePostInputDTO,
  CreatePostOutputDTO,
} from "../dtos/Post/createPost.dto";
import {
  DeletePostInputDTO,
  DeletePostOutputDTO,
} from "../dtos/Post/delete.dto";
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/Post/editPost.dto";
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/Post/getPosts.dto";

import {
  LikeOrDislikePostInputDTO,
  LikeOrDislikePostOutputDTO,
} from "../dtos/Post/likeOrdeslikePost.dto";
import { NotFoundError } from "../errors/NotFoundError";

import { LikeDislikeDB, Post, PostDB, POST_LIKE } from "../models/Posts";
import { USER_ROLES } from "../models/User";
import { TokenManager } from "../services/TokenManager";

import { IdGenerator } from "../services/IdGenerator";
import { BadRequestError } from "../errors/BadRequestError";

export class PostBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private idGenerator: IdGenerator,
    private tokenManeger: TokenManager
  ) {}

  public getPost = async (
    input: GetPostsInputDTO
  ): Promise<GetPostsOutputDTO> => {
    const { token } = input;

    const payload = this.tokenManeger.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido.");
    }

    const postsWithCreatorName =
      await this.postDatabase.findPostsWithCreatorName();

    const posts = postsWithCreatorName.map((postWithCreatorName) => {
      const post = new Post(
        postWithCreatorName.id,
        postWithCreatorName.content,
        postWithCreatorName.likes,
        postWithCreatorName.dislikes,
        postWithCreatorName.created_at,
        postWithCreatorName.updated_at,
        postWithCreatorName.creator_id,
        postWithCreatorName.creator_name
      );
      return post.toBusinessModel();
    });

    const output: GetPostsOutputDTO = posts;

    return output;
  };

  public postPost = async (
    input: CreatePostInputDTO
  ): Promise<CreatePostOutputDTO> => {
    const { token, content } = input;

    const payload = this.tokenManeger.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const id = this.idGenerator.generate();

    const newPost = new Post(
      id,
      content,
      0,
      0,
      new Date().toString(),
      new Date().toString(),
      payload.id,
      payload.name
    );

    const newPostDB = newPost.toDBModel();
    await this.postDatabase.createPost(newPostDB);

    const output: CreatePostOutputDTO = undefined;

    return output;
  };

  public putPost = async (
    input: EditPostInputDTO
  ): Promise<EditPostOutputDTO> => {
    const { token, idToEdit, content } = input;

    const payload = this.tokenManeger.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const postDBExists = await this.postDatabase.findPostById(idToEdit);

    if (!postDBExists) {
      throw new NotFoundError("Post id not found");
    }

    if (postDBExists.creator_id !== payload.id) {
      throw new BadRequestError("Only the creator of the post can edit it");
    }

    const post = new Post(
      postDBExists.id,
      postDBExists.content,
      postDBExists.likes,
      postDBExists.dislikes,
      postDBExists.created_at,
      postDBExists.updated_at,
      postDBExists.creator_id,
      payload.name
    );

    post.setContent(content);

    const updatedPostDB = post.toDBModel();
    await this.postDatabase.editPost(updatedPostDB);

    const output: EditPostOutputDTO = undefined;

    return output;
  };

  public deletePost = async (
    input: DeletePostInputDTO
  ): Promise<DeletePostOutputDTO> => {
    const { token, idToDelete } = input;

    const payload = this.tokenManeger.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const postDBExists = await this.postDatabase.findPostById(idToDelete);

    if (!postDBExists) {
      throw new NotFoundError("Post-Is não existe");
    }

    if (payload.role !== USER_ROLES.ADMIN) {
      if (payload.id !== postDBExists.creator_id) {
        throw new BadRequestError("Somente quem criou o post pode deletá-lo");
      }
    }

    await this.postDatabase.removePost(idToDelete);

    const output: DeletePostOutputDTO = undefined;

    return output;
  };
}
