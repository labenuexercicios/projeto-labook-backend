import { LikeDislikeDB, POST_LIKE, PostDB, PostWithCreatorDB } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";
import { UsersDatabase } from "./UserDatabase";

export class PostsDatabase extends BaseDatabase {
  public static TABLE_POSTS = "posts";
  public static TABLE_LIKES_DISLIKES = "likes_dislikes";

  // Insere um novo post no banco de dados
  public async insertPost(newPostDB: PostDB): Promise<void> {
    await BaseDatabase
      .connection(PostsDatabase.TABLE_POSTS)
      .insert(newPostDB);
  }

  // Obtém os posts com os dados do criador, opcionalmente filtrados por uma query
  public async getPostsWithCreator(query: string | undefined): Promise<PostWithCreatorDB[]> {
    if (query) {
      const result: PostWithCreatorDB[] = await BaseDatabase
        .connection(PostsDatabase.TABLE_POSTS)
        .where("content", "LIKE", `%${query}%`)
        .select(
          `${PostsDatabase.TABLE_POSTS}.id`,
          `${PostsDatabase.TABLE_POSTS}.content`,
          `${PostsDatabase.TABLE_POSTS}.likes`,
          `${PostsDatabase.TABLE_POSTS}.dislikes`,
          `${PostsDatabase.TABLE_POSTS}.created_at`,
          `${PostsDatabase.TABLE_POSTS}.updated_at`,
          `${PostsDatabase.TABLE_POSTS}.creator_id`,
          `${UsersDatabase.TABLE_USERS}.name AS creator_name`
        )
        .join(`${UsersDatabase.TABLE_USERS}`, `${PostsDatabase.TABLE_POSTS}.creator_id`, "=", `${UsersDatabase.TABLE_USERS}.id`);

      return result as PostWithCreatorDB[];
    } else {
      const result: PostWithCreatorDB[] = await BaseDatabase
        .connection(PostsDatabase.TABLE_POSTS)
        .select(
          `${PostsDatabase.TABLE_POSTS}.id`,
          `${PostsDatabase.TABLE_POSTS}.content`,
          `${PostsDatabase.TABLE_POSTS}.likes`,
          `${PostsDatabase.TABLE_POSTS}.dislikes`,
          `${PostsDatabase.TABLE_POSTS}.created_at`,
          `${PostsDatabase.TABLE_POSTS}.updated_at`,
          `${PostsDatabase.TABLE_POSTS}.creator_id`,
          `${UsersDatabase.TABLE_USERS}.name AS creator_name`
        )
        .join(`${UsersDatabase.TABLE_USERS}`, `${PostsDatabase.TABLE_POSTS}.creator_id`, "=", `${UsersDatabase.TABLE_USERS}.id`);

      return result as PostWithCreatorDB[];
    }
  }

  // Obtém um post pelo seu ID
  public async getPostById(id: string): Promise<PostDB | undefined> {
    const [result]: PostDB[] = await BaseDatabase
      .connection(PostsDatabase.TABLE_POSTS)
      .where({ id: id });

    return result as PostDB | undefined;
  }

  // Atualiza um post pelo seu ID
  public async updatePostById(id: string, postDB: PostDB): Promise<void> {
    await BaseDatabase
      .connection(PostsDatabase.TABLE_POSTS)
      .update(postDB)
      .where({ id: id });
  }

  // Deleta um usuário pelo seu ID
  public async deleteUserById(id: string): Promise<void> {
    await BaseDatabase
      .connection(PostsDatabase.TABLE_POSTS)
      .del()
      .where({ id: id });
  }

  // Obtém um post com os dados do criador pelo seu ID
  public async getPostWithCreatorById(id: string): Promise<PostWithCreatorDB | undefined> {
    const [result]: PostWithCreatorDB[] = await BaseDatabase
      .connection(PostsDatabase.TABLE_POSTS)
      .select(
        `${PostsDatabase.TABLE_POSTS}.id`,
        `${PostsDatabase.TABLE_POSTS}.content`,
        `${PostsDatabase.TABLE_POSTS}.likes`,
        `${PostsDatabase.TABLE_POSTS}.dislikes`,
        `${PostsDatabase.TABLE_POSTS}.created_at`,
        `${PostsDatabase.TABLE_POSTS}.updated_at`,
        `${PostsDatabase.TABLE_POSTS}.creator_id`,
        `${UsersDatabase.TABLE_USERS}.name AS creator_name`
      )
      .join(`${UsersDatabase.TABLE_USERS}`, `${PostsDatabase.TABLE_POSTS}.creator_id`, "=", `${UsersDatabase.TABLE_USERS}.id`)
      .where({ [`${PostsDatabase.TABLE_POSTS}.id`]: id });

    return result as PostWithCreatorDB | undefined;
  }

  // Obtém o like ou dislike de um usuário em um post específico
  public async getLikeDislike(likeDislikeDB: LikeDislikeDB): Promise<POST_LIKE | undefined> {
    const [result]: LikeDislikeDB[] | undefined = await BaseDatabase
      .connection(PostsDatabase.TABLE_LIKES_DISLIKES)
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id
      });

    return result === undefined
      ? undefined
      : result && result.like === 1
      ? POST_LIKE.ALREADY_LIKED
      : POST_LIKE.ALREADY_DISLIKED;
  }

  // Remove o like ou dislike de um usuário em um post
  public removeLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
    await BaseDatabase
      .connection(PostsDatabase.TABLE_LIKES_DISLIKES)
      .delete()
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id
      });
  }

  // Atualiza o like ou dislike de um usuário em um post
  public updateLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
    await BaseDatabase
      .connection(PostsDatabase.TABLE_LIKES_DISLIKES)
      .update(likeDislikeDB)
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id
      });
  }

  // Insere o like ou dislike de um usuário em um post
  public insertLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
    await BaseDatabase
      .connection(PostsDatabase.TABLE_LIKES_DISLIKES)
      .insert(likeDislikeDB);
  }
}


/* A classe PostsDatabase herda da classe BaseDatabase e fornece métodos para manipular os dados relacionados a posts no banco de dados. Aqui estão as funcionalidades principais:

insertPost: Insere um novo post no banco de dados.
getPostsWithCreator: Obtém os posts com os dados do criador, opcionalmente filtrados por uma query.
getPostById: Obtém um post pelo seu ID.
updatePostById: Atualiza um post pelo seu ID.
deleteUserById: Deleta um usuário pelo seu ID.
getPostWithCreatorById: Obtém um post com os dados do criador pelo seu ID.
getLikeDislike: Obtém o like ou dislike de um usuário em um post específico.
removeLikeDislike: Remove o like ou dislike de um usuário em um post.
updateLikeDislike: Atualiza o like ou dislike de um usuário em um post.
insertLikeDislike: Insere o like ou dislike de um usuário em um post.
Esses métodos são responsáveis por realizar consultas e operações no banco de dados relacionadas a posts e interações de usuários com esses posts, como likes e dislikes.
 */



