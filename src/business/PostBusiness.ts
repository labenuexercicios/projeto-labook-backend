import { PostDatabase } from "../database/PostDataBase"
import { Post, PostDB, PostModel } from "../models/Post"
import { NotFoundError } from "../errors/NotFoundError"
import { BadRequestError } from "../errors/BadRequestError"
import { IdGenerator } from "../services/idGenerator"
import { TokenManager } from "../services/TokenManager"
import { USER_ROLES } from "../models/User"
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/Posts/editPost.dto"
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/Posts/getPosts.dto"
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/Posts/createPost.dto"
import { DeletePostInputDTO, DeletePostOutputDTO } from "../dtos/Posts/deletePost.dto"

export class PostBusiness {

  constructor(
    private postDatabase: PostDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) { }

  public getPosts = async (input: GetPostsInputDTO): Promise<GetPostsOutputDTO> => {

    const { content, token } = input

    const payload = this.tokenManager.getPayload(token)

    const postsModel = await this.postDatabase.findPosts(content)

    if (payload === null) {
      throw new BadRequestError("token inválido")
    }

    const posts = postsModel.map((postModel) => {
      const post: PostModel = {
        id: postModel.id,
        content: postModel.content,
        likes: postModel.likes,
        dislikes: postModel.dislikes,
        createdAt: postModel.createdAt,
        updatedAt: postModel.updatedAt,
        creator: {
          id: postModel.creator.id,
          name: postModel.creator.name
        }
      }
      return post
    })
    const output: GetPostsOutputDTO = posts
      return output
  }

  public createPost = async (input: CreatePostInputDTO): Promise<CreatePostOutputDTO> => {

    const { content, token } = input

    const id = this.idGenerator.generate()

    const payload = this.tokenManager.getPayload(token)

    if (payload === null) {
      throw new BadRequestError("token inválido")
    }

    if (!payload.role.includes(USER_ROLES.ADMIN) || !payload.role.includes(USER_ROLES.NORMAL)) {
      throw new BadRequestError("somente usuários logados podem acessar esse recurso")
    }

    const newPost = new Post(
      id,
      payload.id,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString()
    )

    const newPostDB: PostDB = {
      id: newPost.getId(),
      creatorId: newPost.getCreatorId(),
      content: newPost.getContent(),
      likes: newPost.getLikes(),
      dislikes: newPost.getDislikes(),
      created_at: newPost.getCreatedAt(),
      updated_at: newPost.getUpdatedAt()
    }

    await this.postDatabase.createPost(newPostDB)

    const output = {
      "content": newPost.getContent()
    }
    return output
  }


  public editPost = async (input: EditPostInputDTO): Promise<EditPostOutputDTO> => {

    const {
      idToEdit,
      content,
      token
    } = input

    
    const payload = this.tokenManager.getPayload(token)

    if (payload === null) {
      throw new BadRequestError("token inválido")
    }

    const postToEditDB = await this.postDatabase.findPostById(idToEdit)

    if (!postToEditDB) {
      throw new NotFoundError("Post com suposto id não encontrado")
    }

    const post = new Post(
      postToEditDB.id,
      postToEditDB.creatorId,
      postToEditDB.content,
      postToEditDB.likes,
      postToEditDB.dislikes,
      postToEditDB.created_at,
      new Date().toISOString()
    )

    if (postToEditDB.creatorId !== payload.id) {
      throw new BadRequestError("somente o criador do post podem acessar esse recurso")
    }

    content && post.setContent(content)
    
    const updatePostDB: PostDB = {
      id: post.getId(),
      creatorId: post.getCreatorId(),
      content: post.getContent(),
      likes: post.getLikes(),
      dislikes: post.getDislikes(),
      created_at: post.getCreatedAt(),
      updated_at: post.getUpdatedAt()
    }

    await this.postDatabase.updatePostById(idToEdit, updatePostDB)

    const output = {
      message: "Postagem editada com sucesso",
      post: {
        id: post.getId(),
        creatorId: post.getCreatorId(),
        content: post.getContent(),
        likes: post.getLikes(),
        dislikes: post.getDislikes(),
        createdAt: post.getCreatedAt(),
        updatedAt: post.getUpdatedAt()
      }
    }

    return output

  }

  public deletePost = async (input: DeletePostInputDTO): Promise<DeletePostOutputDTO> => {

    const { idToDelete, token } = input

    const postToDeleteDB = await this.postDatabase.findPostById(idToDelete)
    const payload = this.tokenManager.getPayload(token)

    if (payload === null) {
      throw new BadRequestError("token inválido")
    }

    if (!idToDelete) {
      throw new NotFoundError("por favor, insira um id")
    }

    if (!postToDeleteDB) {
      throw new NotFoundError("'id' para deletar não existe")
    }

    const post = new Post(
      postToDeleteDB.id,
      postToDeleteDB.creatorId,
      postToDeleteDB.content,
      postToDeleteDB.likes,
      postToDeleteDB.dislikes,
      postToDeleteDB.created_at,
      postToDeleteDB.updated_at
    )

    if (payload.role !== USER_ROLES.ADMIN || postToDeleteDB.creatorId !== payload.id) {
      throw new BadRequestError("somente admins ou o criador do post podem acessar esse recurso")
    }

    await this.postDatabase.deletePostById(idToDelete)

    const output = {
      message: "Postagem deletada com sucesso",
      post: {
        id: post.getId(),
        creatorId: post.getCreatorId(),
        content: post.getContent(),
        likes: post.getLikes(),
        dislikes: post.getDislikes(),
        createdAt: post.getCreatedAt(),
        updatedAt: post.getUpdatedAt()
      }
    }
    return output
  }
}