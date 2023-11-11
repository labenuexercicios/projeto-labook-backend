import { UserDatabase } from "../database/UserDatabase";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { User } from "../models/User";
import { UserDB } from "../types";

export class UserBusiness {
  public async fetchUsers(input: any) {
    const userDatabase = new UserDatabase();
    const usersDB: Array<UserDB> = await userDatabase.findUsers(input);

    const users = usersDB.map(
      (userDB) =>
        new User(
          userDB.id,
          userDB.name,
          userDB.email,
          userDB.password,
          userDB.role,
          userDB.created_at
        )
    );
    return users;
  }

  public async createUser(input: any) {
    const { id, name, email, password, role } = input;
    if (typeof id !== "string") {
      throw new BadRequestError("'id' deve ser string");
    }

    if (typeof name !== "string") {
      throw new BadRequestError("'name' deve ser string");
    }

    if (typeof email !== "string") {
      throw new BadRequestError("'email' deve ser string");
    }

    if (typeof password !== "string") {
      throw new BadRequestError("'password' deve ser string");
    }
    if (typeof role !== "string") {
      throw new BadRequestError("'role' deve ser string");
    }
    const userDatabase = new UserDatabase();
    const userDBExists = await userDatabase.findUserById(id);
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
    await userDatabase.insertUser(newUserDB);
    return newUser;
  }
  public async updateUser(input: any) {
    const { id, name, email, password, role } = input;
    const userDatabase = new UserDatabase();
    const userDBExists = await userDatabase.findUserById(id);
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
    await userDatabase.updateUser(newUserDB, id);
    return user;
  }
  public async deleteUser(input: any) {
    const { id } = input;
    const userDatabase = new UserDatabase();
    const userDBExists = await userDatabase.findUserById(id);
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
    await userDatabase.deleteUser(userDB, id);
    return user;
  }
}
