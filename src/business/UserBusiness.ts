import { UserDatabase } from "../database/UserDatabase"
import { GetUsersInputDTO, GetUsersOutputDTO } from "../dtos/getUsers.dto"
import { LoginInputDTO, LoginOutputDTO } from "../dtos/login.dto"
import { SignupInputDTO, SignupOutputDTO } from "../dtos/signup.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { TokenPayload, USER_ROLES, User } from "../models/User"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private hashManager: HashManager
  ) { }

  public getUsers = async (
    input: GetUsersInputDTO
  ): Promise<GetUsersOutputDTO> => {
    const { q, token } = input

    const payload = this.tokenManager.getPayload(token)

    if (payload === null) {
      throw new BadRequestError('Token inválido')
    }

    // if (payload.role !== USER_ROLES.ADMIN) {
    //   throw new BadRequestError('O user deve ser ADMIN')
    // }

    console.log('consulta------------------->', q)

    const usersDB = await this.userDatabase.findUsers(q)
    console.log(usersDB)

    const users = usersDB.map((userDB) => {
      const user = new User(
        userDB.id,
        userDB.name,
        userDB.email,
        userDB.password,
        userDB.role,
        userDB.created_at
      )

      return user.toBusinessModel()
    })

    const output: GetUsersOutputDTO = users

    return output
  }

  public signup = async (
    input: SignupInputDTO
  ): Promise<SignupOutputDTO> => {
    const { name, email, password } = input

    const id = this.idGenerator.generate()

    const userDBExists = await this.userDatabase.findUserById(id)

    if (userDBExists) {
      throw new BadRequestError("'id' já existe")
    }

    const hashedPassword = await this.hashManager.hash(password)

    const newUser = new User(
      id,
      name,
      email,
      hashedPassword,
      USER_ROLES.NORMAL, // só é possível criar users com contas normais
      new Date().toISOString()
    )

    const newUserDB = newUser.toDBModel()
    await this.userDatabase.insertUser(newUserDB)

    const payload: TokenPayload = {
      id: newUser.getId(),
      name: newUser.getName(),
      role: newUser.getRole()
    }

    const token = this.tokenManager.createToken(payload)

    const output: SignupOutputDTO = {
      message: "Cadastro realizado com sucesso",
      token
    }

    return output
  }

  public login = async (
    input: LoginInputDTO
  ): Promise<LoginOutputDTO> => {
    const { email, password } = input

    const userDB = await this.userDatabase.findUserByEmail(email)

    if (!userDB) {
      throw new NotFoundError("'email' não encontrado")
    }

    const hashedPassword = userDB.password
    const isPasswordCorrect = await this.hashManager.compare(password, hashedPassword)

    if (!isPasswordCorrect) {
      throw new BadRequestError("'email' ou 'password' incorretos")
    }

    const user = new User(
      userDB.id,
      userDB.name,
      userDB.email,
      userDB.password,
      userDB.role,
      userDB.created_at
    )

    const payload: TokenPayload = {
      id: user.getId(),
      name: user.getName(),
      role: user.getRole()
    }

    const token = this.tokenManager.createToken(payload)

    const output: LoginOutputDTO = {
      message: "Login realizado com sucesso",
      token
    }

    return output
  }
}