import { UserDatabase } from "../database/UserDataBase"
import { UserDB, User } from "../models/User"
import { NotFoundError } from "../errors/NotFoundError"
import { BadRequestError } from "../errors/BadRequestError"
import { LoginInputDTO, LoginOutputDTO } from "../dtos/login.dto"
import { SignupInputDTO, SignupOutputDTO } from "../dtos/signup.dto"
import { EditUserInputDTO, EditUsertOutputDTO } from "../dtos/editUser.dtos"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/idGenerator"

export class UserBusiness {

    constructor(
      private userDatabase: UserDatabase,
      private tokenManager: TokenManager,
      private idGenerator: IdGenerator
      ) { }

      public signup = async (
        input: SignupInputDTO
      ): Promise<SignupOutputDTO> => {
        const { name, email, password, role } = input
        const id = this.idGenerator.generate()

        const userDBExists = await this.userDatabase.findUsers(id)

        if (userDBExists) {
            throw new Error("'id' já existe")
        }

        const newUser = new User(
            id,
            name,
            email,
            password,
            role,
            new Date().toISOString()
        ) 

        const newUserDB: UserDB = {
            id: newUser.getId(),
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            role: newUser.getRole(),
            created_at: newUser.getCreatedAt()
        }

        await this.userDatabase.insertUser(newUserDB)

        const token = this.tokenManager.createToken({
          id: newUser.getId(),
          role: newUser.getRole(),
          name: newUser.getName()
        })

        const output = {
            message: "Cadastro realizado com sucesso",
            user: newUser,
            token
        }

        return output
    }

    
  public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
    const { email, password } = input

    const userDB = await this.userDatabase.findUserByEmail(email)

    if (!userDB) {
      throw new NotFoundError("'email' não encontrado")
    }

    if (password !== userDB.password) {
      throw new BadRequestError("email e senha não conferem")
    }

    const token = this.tokenManager.createToken({
      id: userDB.id,
      role: userDB.role,
      name: userDB.name
    })

    const output: LoginOutputDTO = {
      message: "Login realizado com sucesso",
      token: token
    }

    return output
  }

    public getUsers = async (name?: string | undefined) => {

      let usersDB;

      if(name){
        usersDB = await this.userDatabase.findUsers(name)
      } else {
        usersDB = await this.userDatabase.findUsers()
      }

      const users: User[] = usersDB.map((userDB) => new User(
          userDB.id,
          userDB.name,
          userDB.email,
          userDB.password,
          userDB.role,
          userDB.created_at
      ))

      return users
  }

    public editUser = async (input: EditUserInputDTO): Promise<EditUsertOutputDTO> => {

      const {
        emailToEdit,
        id,
        name,
        email,
        password,
        role
      } = input
  
      const userToEditDB = await this.userDatabase.findUserByEmail(emailToEdit)
  
      if (!userToEditDB) {
        throw new NotFoundError("'id' para editar não existe")
      }
  
      const user = new User(
        userToEditDB.id,
        userToEditDB.name,
        userToEditDB.email,
        userToEditDB.password,
        userToEditDB.role,
        userToEditDB.created_at,
      )
  
      email && user.setEmail(email)
      password && user.setPassword(password)
  
      const updatedUserDB: UserDB = {
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
        role: user.getRole(),
        created_at: user.getCreatedAt()
      }
  
      await this.userDatabase.updateUserByEmail(emailToEdit, updatedUserDB)
  
      const output = {
        message: "Usuário editado com sucesso",
        user: {
          id: user.getId(),
          name: user.getName(),
          email: user.getEmail(),
          password: user.getPassword(),
          role: user.getRole(),
          createdAt: user.getCreatedAt()
        }
      }
  
      return output
    
    }

  public deleteUser = async (input: any) => {
    const { emailToDelete } = input

    const userToDeleteDB = await this.userDatabase.findUserByEmail(emailToDelete)

    if (!emailToDelete) {
      throw new NotFoundError("por favor, insira um email")
    }

    if (!userToDeleteDB) {
        throw new NotFoundError("'email' para deletar não existe")
      }

    const user = new User(
        userToDeleteDB.id,
        userToDeleteDB.name,
        userToDeleteDB.email,
        userToDeleteDB.password,
        userToDeleteDB.role,
        userToDeleteDB.created_at
    )

    await this.userDatabase.deleteUserByEmail(userToDeleteDB.email)

    const output = {
      message: "Usuário deletado com sucesso",
      product: {
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
        role: user.getRole(),
        createdAt: user.getCreatedAt()
      }
    }

    return output
  }
}