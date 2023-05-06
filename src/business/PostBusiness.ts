import { PostDatabase } from "../database/PostDatabase";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { PostDB } from "../types";
import { Post } from "../models/Post";
import { IdGenerator } from "../sevices/IdGenerator";
import { TokenManager } from "../sevices/TokenManager";
import { GetPostInputDTO, GetPostOutputDTO } from "../dtos/Post/getPosts.dto";
import {
  CreatePostInputDTO,
  CreatePostOutputDTO,
} from "../dtos/Post/createPost.dto";

export class PostBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private idGenerator: IdGenerator,
    private tokenManage: TokenManager
  ) {}

  public getPosts = async (
    input: GetPostInputDTO
  ): Promise<GetPostOutputDTO> => {
    const { q, token } = input;

    const payload = this.tokenManage.getPayload(token);

    if (payload === null) {
      throw new Error("Você não esta logado");
    }

    const postsDB = await this.postDatabase.findePosts(q);

    const post = postsDB.map((postDB) => {
      const product = new Post(
        postDB.id,
        postDB.content,
        postDB.likes,
        postDB.deslikes,
        postDB.created_at,
        postDB.updated_at,
        postDB.creator_id
      );

      return product.toBusinessModel();
    });

    const output: GetPostOutputDTO = post;

    return output;
  };
  // public createProduct = async (
  //   input: CreatePostInputDTO
  // ): Promise<CreatePostOutputDTO> => {
  //   const { name, content, like, deslike } = input;

  //   const id = this.idGenerator.generate();

  //   const newProduct = new Post(
  //     id,
  //     name,
  //     content,
  //     like,
  //     deslike,
  //     new Date().toISOString(),
  //     new Date().toISOString(),
  //     creatorId
  //   );

  //   const newProductDB = newProduct.toDBModel();
  //   await this.PostDatabase.insertProduct(newProductDB);

  //   const output: CreateProductOutputDTO = {
  //     message: "Producto cadastrado com sucesso",
  //     product: newProduct.toBusinessModel(),
  //   };

  //   return output;
  // };
}
