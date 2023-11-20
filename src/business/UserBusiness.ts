import { UserDatabase } from "../database/UserDatabase";
import { CreateUserInputDTO, CreateUserOutputDTO } from "../dtos/Users/createUser.dto";
import { DeleteUserInputDTO, DeleteUserOutputDTO } from "../dtos/Users/deleteUser.dto";
import {
  FetchUsersInputDTO,
  FetchUsersOutputDTO,
} from "../dtos/Users/fetchUsers.dto";
import { UpdateUserInputDTO, UpdateUserOutputDTO } from "../dtos/Users/updateUser.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { User, UserDB } from "../models/User";

export class UserBusiness {
  constructor(private userDatabase: UserDatabase) {}
  public async fetchUsers(
    input: FetchUsersInputDTO
  ): Promise<FetchUsersOutputDTO> {
    const { nameToSearch } = input;
    const usersDB: Array<UserDB> = await this.userDatabase.findUsers(
      nameToSearch
    );

    const output: FetchUsersOutputDTO = {
      users: usersDB.map(
        (userDB) =>
          new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
          )
      )
    }
    return output;
  }

  public async createUser(
    input: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
    const { id, name, email, password, role } = input;

    const userDBExists = await this.userDatabase.findUserById(id);
    if (userDBExists) {
      throw new BadRequestError('"id" ja cadasttrado');
    }
    const newUser = new User(
      id,
      name,
      email,
      password,
      role,
      new Date().toISOString()
    );
    const newUserDB: UserDB = {
      id: newUser.getId(),
      name: newUser.getName(),
      email: newUser.getEmail(),
      password: newUser.getPassword(),
      role: newUser.getRole(),
      created_at: newUser.getCreatedAt(),
    };
    await this.userDatabase.insertUser(newUserDB);
    const output: CreateUserOutputDTO = {
      message: "Usuario registrado com sucesso",
      user: {
        id: newUser.getId(),
        name: newUser.getName(),
        email: newUser.getEmail(),
        password: newUser.getPassword(),
        role: newUser.getRole(),
        creadtedAt: newUser.getCreatedAt()
      }
    }
    return output;
  }
  public async updateUser(
    input: UpdateUserInputDTO
    ): Promise<UpdateUserOutputDTO> {
    const { idToEdit, id, name, email, password, role } = input;
    const userDBExists = await this.userDatabase.findUserById(idToEdit);
    if (!userDBExists) {
      throw new NotFoundError('Usuario nao econtrado, cheque o "id"');
    }
    const user = new User(
      userDBExists.id,
      userDBExists.name,
      userDBExists.email,
      userDBExists.password,
      userDBExists.role,
      userDBExists.created_at
    );
    name && user.setName(name);
    email && user.setEmail(email);
    password && user.setPassword(password);
    role && user.setRole(role);

    const newUserDB: UserDB = {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
      role: user.getRole(),
      created_at: user.getCreatedAt(),
    };
    await this.userDatabase.updateUser(newUserDB, idToEdit);

    const output: UpdateUserOutputDTO = {
      message: "Usuario editado com sucesso",
      user: {
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
        role: user.getRole(),
        createdAt: user.getCreatedAt()
      }
    }
    return output;
  }
  public async deleteUser(input: DeleteUserInputDTO): Promise<DeleteUserOutputDTO> {
    const { idToDelete } = input;
    const userDBExists = await this.userDatabase.findUserById(idToDelete);
    if (!userDBExists) {
      throw new NotFoundError("Usuario nao encontrado");
    }
    const user = new User(
      userDBExists.id,
      userDBExists.name,
      userDBExists.email,
      userDBExists.password,
      userDBExists.role,
      userDBExists.created_at
    );
    const userDB: UserDB = {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
      role: user.getRole(),
      created_at: user.getCreatedAt(),
    };
    await this.userDatabase.deleteUser(userDB, idToDelete);

    const output: DeleteUserOutputDTO = {
      message: "Usuario deletado com sucesso",
      user
    }
    return output;
  }
}
