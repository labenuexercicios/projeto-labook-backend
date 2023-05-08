import { PostDatabase } from "../database/PostDataBase";
import { CreatePostInputDTO } from "../dtos/posts/CreatPostDTO";
import { DeletePostInputDTO } from "../dtos/posts/DeletePostDTO";
import { EditPostInputDTO } from "../dtos/posts/EditPostDTO";
import { GetPostInputDTO, GetPostOutputDTO } from "../dtos/posts/GetPostDTO";
import { LikePostInputDTO } from "../dtos/posts/LikePostDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { Post, PostDB, PostModel } from "../models/Posts";
import { USER_ROLES, UserDB } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  public getPosts = async (
    input: GetPostInputDTO
  ): Promise<GetPostOutputDTO[]> => {
    const { token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const [postsDB, usersDB] = await this.postDatabase.getPosts();

    const posts = postsDB.map((postDB) => {
      return new Post(
        postDB.id,
        postDB.creator_id,
        postDB.content,
        postDB.likes,
        postDB.dislikes,
        postDB.created_at,
        postDB.updated_at
      );
    });

    const output: GetPostOutputDTO[] = posts.map((post) => {
      const creator: UserDB = usersDB.find(
        (userDB) => userDB.id === post.getCreatorId()
      );

      return {
        id: post.getId(),
        content: post.getContent(),
        likes: post.getLikes(),
        dislikes: post.getDislikes(),
        createdAt: post.getCreatedAt(),
        updatedAt: post.getUpdatedAt(),
        creatorId: post.getCreatorId(),
      };
    });

    return output;
  };

  public createPost = async (input: CreatePostInputDTO) => {
    const { content, token } = input;

    const payload = this.tokenManager.getPayload(token);

    console.log(payload);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const id = this.idGenerator.generate();

    const newPost = new Post(
      id,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString(),
      payload.id
    );

    const newPostDB: PostDB = {
      id: newPost.getId(),
      creator_id: newPost.getCreatorId(),
      content: newPost.getContent(),
      likes: newPost.getLikes(),
      dislikes: newPost.getDislikes(),
      created_at: newPost.getCreatedAt(),
      updated_at: newPost.getUpdatedAt(),
    };

    this.postDatabase.createPost(newPostDB);
  };

  public editPost = async (input: EditPostInputDTO) => {
    const { id, token, content } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const [posts] = await this.postDatabase.getPosts();

    console.log(content);

    const postDB = posts.find((post) => {
      return post.id === id && post.creator_id === payload.id;
    });

    if (!postDB) {
      throw new BadRequestError(
        "Não existem posts com esse id para este usuário"
      );
    }

    await this.postDatabase.editPost(id, content);
  };

  public deletePost = async (input: DeletePostInputDTO) => {
    const { id, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const [posts] = await this.postDatabase.getPosts();

    let postDB = [];

    if (payload.role === USER_ROLES.NORMAL) {
      postDB = posts.find((post) => {
        return post.id === id && post.creator_id === payload.id;
      });
    }

    if (payload.role === USER_ROLES.ADMIN) {
      postDB = posts.find((post) => {
        return post.id === id;
      });
      console.log(payload.role);
    }

    if (!postDB) {
      throw new BadRequestError(
        "Não existem posts com esse id para este usuário"
      );
    }

    await this.postDatabase.deletePost(id);
  };

  public likePost = async (input: LikePostInputDTO) => {
    const { id, token, like } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const [posts] = await this.postDatabase.getPosts();

    const postDB = posts.find((post) => {
      return post.id === id;
    });

    if (postDB) {
      const isYourPost = posts.find((post) => {
        return post.id === id && post.creator_id === payload.id;
      });
      if (isYourPost) {
        throw new BadRequestError(
          "Não é possível interagir com um post do usuario logado"
        );
      }
    }

    if (!postDB) {
      throw new BadRequestError("Não existem posts com esse id");
    }

    const isLiked = await this.postDatabase.verifyLike(id, payload.id);

    console.log(isLiked);

    let likesNumber = postDB.likes;
    let dislikesNumber = postDB.dislikes;

    if (like) {
      if (isLiked === 1) {
        throw new BadRequestError("O usuário já deu like neste post");
      }

      if (isLiked === 0) {
        likesNumber = postDB.likes + 1;
        dislikesNumber = postDB.dislikes - 1;
      } else if (isLiked === 2) {
        likesNumber = postDB.likes + 1;
        dislikesNumber = 0;
      }

      // const alreadyLiked = 1

      await this.postDatabase.likePost(
        likesNumber,
        dislikesNumber,
        id,
        payload.id,
        like
      );
    } else if (!like) {
      if (isLiked === 0) {
        throw new BadRequestError("O usuário já deu dislike neste post");
      }

      if (isLiked === 1) {
        likesNumber = postDB.likes - 1;
        dislikesNumber = postDB.dislikes + 1;
      } else if (isLiked === 2) {
        likesNumber = 0;
        dislikesNumber = postDB.dislikes + 1;
      }

      await this.postDatabase.dislikePost(
        likesNumber,
        dislikesNumber,
        id,
        payload.id,
        like
      );
    }
  };
}
