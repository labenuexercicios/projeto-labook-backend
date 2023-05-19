import { PostsDatabase } from "../database/PostsDatabase";
import {
  CreatePostInputDTO,
  CreatePostOutputDTO,
} from "../dto/Post/createPost.dto";
import {
  DeletePostByIdInputDTO,
  DeletePostByIdOutputDTO,
} from "../dto/Post/deletePostById.dto";
import {
  EditPostByIdInputDTO,
  EditPostByIdOutputDTO,
} from "../dto/Post/editPostById.dto";
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dto/Post/getPosts.dto";
import {
  LikeOrDislikePostInputDTO,
  LikeOrDislikePostOutputDTO,
} from "../dto/Post/likeOrDislikePost.dto";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import {
  LikeDislikeDB,
  POST_LIKE,
  Post,
  PostDB,
  PostModel,
  PostWithCreatorDB,
} from "../models/Post";
import { TokenPayload, USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostBusiness {
  constructor(
    private postsDatabase: PostsDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  // Método para criar um post
  public createPost = async (
    input: CreatePostInputDTO
  ): Promise<CreatePostOutputDTO> => {
    const { content, token } = input;

    // Verificar se o token é válido
    const payload: TokenPayload | null = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    // Gerar um ID para o post
    const id: string = this.idGenerator.generate();

    // Criar um novo post com os dados fornecidos
    const newPost = new Post(
      id,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString(),
      payload.id,
      payload.name
    );

    // Converter o novo post para o formato de banco de dados
    const newPostDB: PostDB = newPost.toDBModel();

    // Inserir o novo post no banco de dados
    await this.postsDatabase.insertPost(newPostDB);

    const output: CreatePostOutputDTO = {
      message: "Post criado com sucesso!",
    };

    return output;
  };

  // Método para obter os posts
  public getPosts = async (
    input: GetPostsInputDTO
  ): Promise<GetPostsOutputDTO> => {
    const { query, token } = input;

    // Verificar se o token é válido
    const payload: TokenPayload | null = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    // Obter os posts do banco de dados
    const postsDB: PostWithCreatorDB[] =
      await this.postsDatabase.getPostsWithCreator(query);

    // Verificar se existem posts
    if (!postsDB.length) {
      throw new NotFoundError("Nenhum post foi cadastrado no banco de dados.");
    }

    // Converter os posts para o formato de negócio
    const posts: PostModel[] = postsDB.map((postDB) => {
      const post = new Post(
        postDB.id,
        postDB.content,
        postDB.likes,
        postDB.dislikes,
        postDB.created_at,
        postDB.updated_at,
        postDB.creator_id,
        postDB.creator_name
      );
      return post.toBusinessModel();
    });

    const output: GetPostsOutputDTO = posts;
    return output;
  };

  // Método para editar um post pelo ID
  public editPostById = async (
    input: EditPostByIdInputDTO
  ): Promise<EditPostByIdOutputDTO> => {
    const { idToEditPost, content, token } = input;

    // Verificar se o token é válido
    const payload: TokenPayload | null = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    // Obter o post pelo ID
    const postDB: PostDB | undefined = await this.postsDatabase.getPostById(
      idToEditPost
    );

    // Verificar se o post existe
    if (!postDB) {
      throw new NotFoundError("Post não encontrado.");
    }

    // Verificar se o usuário tem permissão para editar o post
    if (payload.role !== USER_ROLES.ADMIN) {
      if (payload.id !== postDB.creator_id) {
        throw new ForbiddenError(
          "Somente o criador pode editar o post. Caso não tenha acesso à sua conta, entre em contato com nosso suporte."
        );
      }
    }

    // Atualizar o conteúdo e a data de atualização do post
    const post = new Post(
      postDB.id,
      postDB.content,
      postDB.likes,
      postDB.dislikes,
      postDB.created_at,
      postDB.updated_at,
      payload.id,
      payload.name
    );

    post.CONTENT = content;
    post.UPDATED_AT = new Date().toISOString();

    // Converter o post atualizado para o formato de banco de dados
    const updatedPostDB: PostDB = post.toDBModel();

    // Atualizar o post no banco de dados
    await this.postsDatabase.updatePostById(postDB.id, updatedPostDB);

    const output: EditPostByIdOutputDTO = {
      message: "Post atualizado com sucesso!",
    };

    return output;
  };

  // Método para excluir um post pelo ID
  public deletePostById = async (
    input: DeletePostByIdInputDTO
  ): Promise<DeletePostByIdOutputDTO> => {
    const { idToDelete, token } = input;

    // Verificar se o token é válido
    const payload: TokenPayload | null = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    // Obter o post pelo ID
    const postDB: PostDB | undefined = await this.postsDatabase.getPostById(
      idToDelete
    );

    // Verificar se o post existe
    if (!postDB) {
      throw new NotFoundError("Post não encontrado.");
    }

    // Verificar se o usuário tem permissão para excluir o post
    if (payload.role !== USER_ROLES.ADMIN) {
      if (payload.id !== postDB.creator_id) {
        throw new ForbiddenError(
          "Somente o criador pode excluir o post. Caso não tenha acesso à sua conta, entre em contato com nosso suporte."
        );
      }
    }

    // Excluir o post do banco de dados
    await this.postsDatabase.deleteUserById(idToDelete);

    const output: DeletePostByIdOutputDTO = {
      message: "Post excluído com sucesso!",
    };

    return output;
  };

  // Método para curtir ou descurtir um post
  public likeOrDislikePost = async (
    input: LikeOrDislikePostInputDTO
  ): Promise<void | LikeOrDislikePostOutputDTO> => {
    const { postId, token, like } = input;

    // Verificar se o token é válido
    const payload: TokenPayload | null = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    // Obter o post com o nome do criador
    const postDBWithCreatorName: PostWithCreatorDB | undefined =
      await this.postsDatabase.getPostWithCreatorById(postId);

    // Verificar se o post existe
    if (!postDBWithCreatorName) {
      throw new NotFoundError("Post com esse ID não encontrado.");
    }

    // Verificar se o usuário está tentando interagir com seu próprio post
    if (payload.id === postDBWithCreatorName.creator_id) {
      throw new ForbiddenError(
        "Não é possível interagir com seu próprio post."
      );
    }

    // Criar um objeto de Post a partir dos dados do banco de dados
    const post = new Post(
      postDBWithCreatorName.id,
      postDBWithCreatorName.content,
      postDBWithCreatorName.likes,
      postDBWithCreatorName.dislikes,
      postDBWithCreatorName.created_at,
      postDBWithCreatorName.updated_at,
      postDBWithCreatorName.creator_id,
      postDBWithCreatorName.creator_name
    );

    // Converter o valor de like para o formato do banco de dados
    const likeSQLite: number = like ? 1 : 0;

    // Criar um objeto de LikeDislikeDB para interação com o banco de dados
    const likeDislikeDB: LikeDislikeDB = {
      user_id: payload.id,
      post_id: postId,
      like: likeSQLite,
    };

    // Verificar se o usuário já curtiu ou descurtiu o post
    const likeDislikeExists: POST_LIKE | undefined =
      await this.postsDatabase.getLikeDislike(likeDislikeDB);

    // Realizar as ações apropriadas com base no estado anterior da interação
    likeDislikeExists === POST_LIKE.ALREADY_LIKED && like
      ? (await this.postsDatabase.removeLikeDislike(likeDislikeDB),
        post.removeLike())
      : likeDislikeExists === POST_LIKE.ALREADY_LIKED && !like
      ? (await this.postsDatabase.updateLikeDislike(likeDislikeDB),
        post.removeLike(),
        post.addDislike())
      : likeDislikeExists === POST_LIKE.ALREADY_DISLIKED && !like
      ? (await this.postsDatabase.removeLikeDislike(likeDislikeDB),
        post.removeDislike())
      : likeDislikeExists === POST_LIKE.ALREADY_DISLIKED && like
      ? (await this.postsDatabase.updateLikeDislike(likeDislikeDB),
        post.removeDislike(),
        post.addLike())
      : likeDislikeExists === undefined && like
      ? (await this.postsDatabase.insertLikeDislike(likeDislikeDB),
        post.addLike())
      : (await this.postsDatabase.insertLikeDislike(likeDislikeDB),
        post.addDislike());

    // Converter o post atualizado para o formato de banco de dados
    const updatedPostDB: PostDB = post.toDBModel();

    // Atualizar o post no banco de dados
    await this.postsDatabase.updatePostById(postId, updatedPostDB);

    const output: LikeOrDislikePostOutputDTO = undefined
    return output

  };
}
