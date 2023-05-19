import { PostsDatabase } from "../database/PostsDatabase"
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dto/Post/createPost.dto"
import { DeletePostByIdInputDTO, DeletePostByIdOutputDTO } from "../dto/Post/deletePostById.dto"
import { EditPostByIdInputDTO, EditPostByIdOutputDTO } from "../dto/Post/editPostById.dto"
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dto/Post/getPosts.dto"
import { LikeOrDislikePostInputDTO, LikeOrDislikePostOutputDTO } from "../dto/Post/likeOrDislikePost.dto"
import { ForbiddenError } from "../errors/ForbiddenError"
import { NotFoundError } from "../errors/NotFoundError"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { LikeDislikeDB, POST_LIKE, Post, PostDB, PostModel, PostWithCreatorDB } from "../models/Post"
import { TokenPayload, USER_ROLES } from "../models/User"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export class PostBusiness {
  constructor(
    private postsDatabase: PostsDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) { }

  public createPost = async (input: CreatePostInputDTO): Promise<CreatePostOutputDTO> => {

    const { content, token } = input

    const payload: TokenPayload | null = this.tokenManager.getPayload(token)

    if (!payload) {
      throw new UnauthorizedError()
    }

    const id: string = this.idGenerator.generate()

    const newPost = new Post(
      id,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString(),
      payload.id,
      payload.name
    )

    const newPostDB: PostDB = newPost.toDBModel()
    await this.postsDatabase.insertPost(newPostDB)

    const output: CreatePostOutputDTO = {
      message: "Post criado com sucesso!"
    }

    return output
  }

  public getPosts = async (input: GetPostsInputDTO): Promise<GetPostsOutputDTO> => {

    const { query, token } = input

    const payload: TokenPayload | null = this.tokenManager.getPayload(token)

    if (!payload) {
      throw new UnauthorizedError()
    }

    const postsDB: PostWithCreatorDB[] = await this.postsDatabase.getPostsWithCreator(query)

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
      )

      return post.toBusinessModel()

    })

    if (!posts.length) {
      throw new NotFoundError("Nenhum post foi cadastrado no banco de dados.")
    }

    const output: GetPostsOutputDTO = posts
    return output
  }

  public editPostById = async (input: EditPostByIdInputDTO): Promise<EditPostByIdOutputDTO> => {
    const { idToEditPost, content, token } = input

    const payload: TokenPayload | null = this.tokenManager.getPayload(token)

    if (!payload) {
      throw new UnauthorizedError()
    }

    const postDB: PostDB | undefined = await this.postsDatabase.getPostById(idToEditPost)

    if (!postDB) {
      throw new NotFoundError("Post não encontrado.")
    }

    if (payload.role !== USER_ROLES.ADMIN) {
      if (payload.id !== postDB.creator_id) {
        throw new ForbiddenError("Somente o criador pode editar o post. Caso não tenha acesso a sua conta, entre em contato com nosso suporte.")
      }
    }

    const post = new Post(
      postDB.id,
      postDB.content,
      postDB.likes,
      postDB.dislikes,
      postDB.created_at,
      postDB.updated_at,
      payload.id,
      payload.name
    )

    post.CONTENT = content
    post.UPDATED_AT = new Date().toISOString()

    const updatedPostDB: PostDB = post.toDBModel()
    await this.postsDatabase.updatePostById(postDB.id, updatedPostDB)

    const output: EditPostByIdOutputDTO = {
      message: "Post atualizado com sucesso!",
    }

    return output
  }

  public deletePostById = async (input: DeletePostByIdInputDTO): Promise<DeletePostByIdOutputDTO> => {

    const { idToDelete, token } = input

    const payload: TokenPayload | null = this.tokenManager.getPayload(token)

    if (!payload) {
      throw new UnauthorizedError()
    }

    const postDB: PostDB | undefined = await this.postsDatabase.getPostById(idToDelete)

    if (!postDB) {
      throw new NotFoundError("Post não encontrado.")
    }

    if (payload.role !== USER_ROLES.ADMIN) {
      if (payload.id !== postDB.creator_id) {
        throw new ForbiddenError("Somente o criador pode excluir o post. Caso não tenha acesso a sua conta, entre em contato com nosso suporte.")
      }
    }

    await this.postsDatabase.deleteUserById(idToDelete)

    const output: DeletePostByIdOutputDTO = {
      message: "Post excluído com sucesso!",
    }

    return output
  }

  public likeOrDislikePost = async (input: LikeOrDislikePostInputDTO): Promise<LikeOrDislikePostOutputDTO> => {

    const { postId, token, like } = input

    const payload: TokenPayload | null = this.tokenManager.getPayload(token)

    if (!payload) {
      throw new UnauthorizedError()
    }

    const postDBWithCreatorName: PostWithCreatorDB | undefined = await this.postsDatabase.getPostWithCreatorById(postId)

    if (!postDBWithCreatorName) {
      throw new NotFoundError("Post com esse id não encontrado.")
    }

    if (payload.id === postDBWithCreatorName.creator_id) {
      throw new ForbiddenError("Não é possível interagir com seu próprio post.")
    }

    const post = new Post(
      postDBWithCreatorName.id,
      postDBWithCreatorName.content,
      postDBWithCreatorName.likes,
      postDBWithCreatorName.dislikes,
      postDBWithCreatorName.created_at,
      postDBWithCreatorName.updated_at,
      postDBWithCreatorName.creator_id,
      postDBWithCreatorName.creator_name
    )

    const likeSQLite: number = like ? 1 : 0

    const likeDislikeDB: LikeDislikeDB = {
      user_id: payload.id,
      post_id: postId,
      like: likeSQLite
    }

    const likeDislikeExists: POST_LIKE | undefined = await this.postsDatabase.getLikeDislike(likeDislikeDB)

    likeDislikeExists === POST_LIKE.ALREADY_LIKED && like ?
      (await this.postsDatabase.removeLikeDislike(likeDislikeDB), post.removeLike())
      : likeDislikeExists === POST_LIKE.ALREADY_LIKED && !like ?
        (await this.postsDatabase.updateLikeDislike(likeDislikeDB), post.removeLike(), post.addDislike())
        : likeDislikeExists === POST_LIKE.ALREADY_DISLIKED && !like ?
          (await this.postsDatabase.removeLikeDislike(likeDislikeDB), post.removeDislike())
          : likeDislikeExists === POST_LIKE.ALREADY_DISLIKED && like ?
            (await this.postsDatabase.updateLikeDislike(likeDislikeDB), post.removeDislike(), post.addLike())
            : likeDislikeExists === undefined && like ?
              (await this.postsDatabase.insertLikeDislike(likeDislikeDB), post.addLike())
              : (await this.postsDatabase.insertLikeDislike(likeDislikeDB), post.addDislike())

    const updatedPostDB: PostDB = post.toDBModel()

    await this.postsDatabase.updatePostById(postId, updatedPostDB)

    const output: LikeOrDislikePostOutputDTO = undefined
    return output

  }
}