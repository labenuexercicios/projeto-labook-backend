import { UserDatabase } from "../database/UserDataBase"
import { UserDB, User } from "../models/User"
import { NotFoundError } from "../errors/NotFoundError"
import { EditUserInputDTO, EditUsertOutputDTO } from "../dtos/editUser.dtos"

export class UserBusiness {

    constructor(private userDatabase: UserDatabase) { }

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
            userDB.createdAt
        ))

        return users
    }

    public createUser = async (input: any) => {
        const { name, email, password, role } = input
        const id: string = "u" + Math.floor(Math.random() * 256).toString()

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
            new Date().toISOString(),
        ) 

        const newUserDB: UserDB = {
            id: newUser.getId(),
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            role: newUser.getRole(),
            createdAt: newUser.getCreatedAt()
        }

        await this.userDatabase.insertUser(newUserDB)

        const output = {
            message: "Cadastro realizado com sucesso",
            user: newUser
        }

        return output
    }

  
    public editUser = async (input: EditUserInputDTO): Promise<EditUsertOutputDTO> => {

      const {
        idToEdit,
        id,
        name,
        email,
        password,
        role
      } = input
  
      const userToEditDB = await this.userDatabase.findUserById(idToEdit)
  
      if (!userToEditDB) {
        throw new NotFoundError("'id' para editar não existe")
      }
  
      const user = new User(
        userToEditDB.id,
        userToEditDB.name,
        userToEditDB.email,
        userToEditDB.password,
        userToEditDB.role,
        userToEditDB.createdAt
      )
  
      email && user.setEmail(email)
      password && user.setPassword(password)
  
      const updatedUserDB: UserDB = {
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
        role: user.getRole(),
        createdAt: user.getCreatedAt()
      }
  
      await this.userDatabase.updateUserById(idToEdit, updatedUserDB)
  
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
    const { idToDelete } = input

    const userToDeleteDB = await this.userDatabase.findUserById(idToDelete)

    if (!idToDelete) {
      throw new NotFoundError("por favor, insira um id")
    }

    if (!userToDeleteDB) {
        throw new NotFoundError("'id' para deletar não existe")
      }

    const user = new User(
        userToDeleteDB.id,
        userToDeleteDB.name,
        userToDeleteDB.email,
        userToDeleteDB.password,
        userToDeleteDB.role,
        userToDeleteDB.createdAt
    )

    await this.userDatabase.deleteUserById(userToDeleteDB.id)

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