import { PostDataBase } from "../database/PostDataBase";
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/userDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { PostWithCreatorsDB } from "../interfaces/types";
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
    const output: GetPostsOutputDTO = posts
    
    return output;
  };
}
