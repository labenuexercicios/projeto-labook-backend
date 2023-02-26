import { PostDataBase } from "../database/PostDataBase";
import {
  CreatePostInputDTO,
  DeletePostInputDTO,
  EditPostInputDTO,
  GetPostsInputDTO,
  GetPostsOutputDTO,
  LikeOrDislikePostInputDTO,
} from "../dtos/userDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { LikesDislikesDB, PostDB, PostWithCreatorsDB, USER_ROLES } from "../interfaces/types";
import { Post } from "../models/Post";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostBusiness {
  constructor(
    private postDataBase: PostDataBase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private hashManager: HashManager
  ) {}
  public getAllPosts = async (
    input: GetPostsInputDTO
  ): Promise<GetPostsOutputDTO> => {
    const { token } = input;

    if (token === undefined) {
      throw new BadRequestError("'token' ausente");
    }

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("Token inválido");
    }

    const postsWithCreatorsDB: PostWithCreatorsDB[] =
      await this.postDataBase.getPostsWithCreators();

    const posts = postsWithCreatorsDB.map((postWithCreatorsDB) => {
      const post = new Post(
        postWithCreatorsDB.id,
        postWithCreatorsDB.content,
        postWithCreatorsDB.likes,
        postWithCreatorsDB.dislikes,
        postWithCreatorsDB.created_at,
        postWithCreatorsDB.updated_at,
        postWithCreatorsDB.creator_id,
        postWithCreatorsDB.creator_name
      );
      return post.toBusinessModel();
    });
    const output: GetPostsOutputDTO = posts;

    return output;
  };
  public createPost = async (input: CreatePostInputDTO): Promise<void> => {
    const { token, content } = input;

    if (token === undefined) {
      throw new BadRequestError("'token' ausente");
    }

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("Token inválido");
    }

    if (typeof content !== "string") {
      throw new BadRequestError("'content' deve ser string");
    }

    const id = this.idGenerator.generate();
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    const creatorId = payload.id;
    const creatorName = payload.name;

    const post = new Post(
      id,
      content,
      0,
      0,
      createdAt,
      updatedAt,
      creatorId,
      creatorName
    );

    const postDB = post.toDBModel();

    await this.postDataBase.insert(postDB);
  };
  public editPost = async (input: EditPostInputDTO): Promise<void> => {
    const { idToEdit, token, content } = input;

    if (token === undefined) {
      throw new BadRequestError("'token' ausente");
    }

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("Token inválido");
    }

    if (typeof content !== "string") {
      throw new BadRequestError("'content' deve ser string");
    }

    const postDB = await this.postDataBase.findById(idToEdit);

    if (!postDB) {
      throw new NotFoundError("'id' não encontrado");
    }

    const creatorId = payload.id;

    if (postDB.creator_id !== payload.id) {
      throw new BadRequestError("somente quem criou o post, pode editá-lo");
    }

    const creatorName = payload.name;

    const post = new Post(
      postDB.id,
      postDB.content,
      postDB.likes,
      postDB.dislikes,
      postDB.created_at,
      postDB.updated_at,
      creatorId,
      creatorName
    );

    post.setContent(content);
    post.setUpdatedAt(new Date().toISOString());

    const updatedPostDB = post.toDBModel();

    await this.postDataBase.update(idToEdit, updatedPostDB);
  };

  public deletePost = async (input: DeletePostInputDTO): Promise<void> => {
    const { idToDelete, token } = input;

    if (token === undefined) {
      throw new BadRequestError("'token' ausente");
    }

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("Token inválido");
    }

    const postDB = await this.postDataBase.findById(idToDelete);

    if (!postDB) {
      throw new NotFoundError("'id' não encontrado");
    }

    const creatorId = payload.id;

    if (
      payload.role !== USER_ROLES.ADMIN &&
      postDB.creator_id !== creatorId
      ) {
      throw new BadRequestError("somente quem criou o post, pode deletá-lo");
    }

    await this.postDataBase.delete(idToDelete);
  };
  public likeOrDislikePost = async (input: LikeOrDislikePostInputDTO): Promise<void> => {
    const { idToLikeOrDislike, token, like } = input;

    if (token === undefined) {
      throw new BadRequestError("'token' ausente");
    }

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("Token inválido");
    }

    if(typeof like !== "boolean") {
      throw new BadRequestError("'like' deve ser boolean")
    }

    const postsWithCreatorDB = await this.postDataBase.findPostsWithCreatorById(idToLikeOrDislike);

    if (!postsWithCreatorDB) {
      throw new NotFoundError("'id' não encontrado");
    }

    const userId = payload.id;
    const likeSQLite = like ? 1 : 0 
    const likeDislikeDB: LikesDislikesDB = {
      user_id: userId,
      post_id: postsWithCreatorDB.id,
      like: likeSQLite
    }

    await this.postDataBase.likeOrDislikePost(likeDislikeDB);

    const post = new Post(
      postsWithCreatorDB.id,
      postsWithCreatorDB.content,
      postsWithCreatorDB.likes,
      postsWithCreatorDB.dislikes,
      postsWithCreatorDB.created_at,
      postsWithCreatorDB.updated_at,
      postsWithCreatorDB.creator_id,
      postsWithCreatorDB.creator_name
    );

    if(like) {
      post.addLike()
    } else {
      post.addDislike()
    }

    const updatedPostDB = post.toDBModel()
    await this.postDataBase.update(idToLikeOrDislike, updatedPostDB)
  };
}
