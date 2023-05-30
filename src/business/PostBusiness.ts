import { PostDatabase } from "../database/PostDatabase"
import { UserDatabase } from "../database/UserDatabase"
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/getPosts.dto"
import { GetUsersInputDTO, GetUsersOutputDTO } from "../dtos/getUsers.dto"
import { LoginInputDTO, LoginOutputDTO } from "../dtos/login.dto"
import { SignupInputDTO, SignupOutputDTO } from "../dtos/signup.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Post } from "../models/Posts"
import { TokenPayload, USER_ROLES, User } from "../models/User"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export class PostBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private tokenManager: TokenManager,
    private idGenerator: IdGenerator,
  ) 
  {}

  public getPosts = async (input: any): Promise<GetPostsOutputDTO> => {
    const {token} = input

    const payload = this.tokenManager.getPayload(token)

    if (payload === null) {
      throw new BadRequestError('Token inválido')
    }

    const postsDB = await this.postDatabase.findPosts()

    const posts: any = postsDB.map((postDB) => {
      const post = new Post(
        postDB.id,
        postDB.creator_id,
        postDB.content,
        postDB.likes,
        postDB.dislikes,
        postDB.created_at,
        postDB.updated_at,

      )
      return post.toBusinessModel()

    })
    
    const output: GetPostsOutputDTO = posts
    return output

    // const usersDB = await this.userDatabase.findUsers(q)

    // const users = usersDB.map((userDB) => {
    //   const user = new User(
    //     userDB.id,
    //     userDB.name,
    //     userDB.email,
    //     userDB.password,
    //     userDB.role,
    //     userDB.created_at
    //   )

    //   return user.toBusinessModel()
    // })

    // const output: GetUsersOutputDTO = users

    // return output
  }

  public createPost = async (
    input: GetPostsInputDTO
  ): Promise<{}> => {

    const {token, creatorId, content} = input

    const isValidToken = await this.tokenManager.getPayload(token)

    if (!isValidToken) {
      throw new BadRequestError('Token inválido!')
    }

    const id = this.idGenerator.generate()
    const likes:boolean = false
    const dislikes:boolean = false
    const createdAt: string = new Date().toISOString()
    const updatedAt: string = new Date().toISOString()


    const newPost = new Post(
      id,
      creatorId,
      content,
      likes,
      dislikes,
      createdAt,
      updatedAt
    )

    const newPostDB = newPost.toDBModel()
    await this.postDatabase.createPost(newPostDB)

    const output = {
      content: newPostDB.content
    }
    return output
    
  }
}