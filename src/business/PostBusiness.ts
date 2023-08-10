import { PostDatabase } from "../database/PostDataBase"
import { PostDB, Post } from "../models/Post"
import { NotFoundError } from "../errors/NotFoundError"
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/editPost.dtos"

export class PostBusiness {

    constructor(private postDatabase: PostDatabase) { }

    public getPosts = async (q: string | undefined) => {

        const postsDB = await this.postDatabase.findPosts(q)

        const users: Post[] = postsDB.map((postDB) => new Post(
            postDB.id,
            postDB.creatorId,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.createdAt,
            postDB.updatedAt
        ))

        return users
    }

    public createPost = async (input: any) => {
        const { id, creatorId, content, likes, dislikes } = input

        const postDBExists = await this.postDatabase.findPosts(id)

        if (postDBExists) {
            throw new Error("'id' já existe")
        }

        const newPost = new Post(
            id,
            creatorId,
            content,
            likes, 
            dislikes,
            new Date().toISOString(),
            new Date().toISOString()
        ) 

        const newPostDB: PostDB = {
            id: newPost.getId(),
            creatorId: newPost.getCreatorId(),
            content: newPost.getContent(),
            likes: newPost.getLikes(),
            dislikes: newPost.getDislikes(),
            createdAt: newPost.getCreatedAt(),
            updatedAt: newPost.getUpdatedAt()
        }

        await this.postDatabase.insertPost(newPostDB)

        const output = {
            message: "Postagem feita com sucesso",
            user: newPost
        }

        return output
    }

  
    public editPost = async (input: EditPostInputDTO): Promise<EditPostOutputDTO> => {

      const {
        idToEdit,
        id,
        creatorId,
        content,
        likes,
        dislikes
      } = input
  
      const postToEditDB = await this.postDatabase.findPostById(idToEdit)
  
      if (!postToEditDB) {
        throw new NotFoundError("'id' para editar não existe")
      }
  
      const post = new Post(
        postToEditDB.id,
        postToEditDB.creatorId,
        postToEditDB.content,
        postToEditDB.likes,
        postToEditDB.dislikes,
        postToEditDB.createdAt,
        postToEditDB.updatedAt 
      )
  
      content && post.setContent(content)
      post.setUpdatedAt(new Date().toISOString())
  
      const updatePostDB: PostDB = {
        id: post.getId(),
        creatorId: post.getCreatorId(),
        content: post.getContent(),
        likes: post.getLikes(),
        dislikes: post.getDislikes(),
        createdAt: post.getCreatedAt(),
        updatedAt: post.getUpdatedAt()
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

  public deletePost = async (input: any) => {
    const { idToDelete } = input

    const postToDeleteDB = await this.postDatabase.findPostById(idToDelete)

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
        postToDeleteDB.createdAt,
        postToDeleteDB.updatedAt 
      )

    await this.postDatabase.deletePostById(postToDeleteDB.id)

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