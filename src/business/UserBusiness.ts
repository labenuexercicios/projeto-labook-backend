import { UserDatabase } from "../database/UserDatabase";
import { User } from "../models/users";
import { UserDB } from "../types";

export class UserBusiness {
  public getUsers = async (input: any) => {
    const { q } = input;

    const userDatabase = new UserDatabase();
    const usersDB = await userDatabase.findUsers(q);

    const users: User[] = usersDB.map(
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
  };

  public createUsers = async (input: any) => {
    const { id, name, email, password, role } = input;

    if (typeof id !== "string" || id.length < 4) {
      throw new Error(
        "O campo 'id' deve ser uma string com pelo menos 4 caracteres"
      );
    }

    if (typeof name !== "string" || name.length < 3) {
      throw new Error(
        "O campo 'nome' deve ser uma string com pelo menos 3 caracteres"
      );
    }

    if (!email || !email.includes("@")) {
      throw new Error(`O campo 'email' deve ser um endereço de e-mail válido`);
    }

    if (typeof password !== "string" || password.length < 6) {
      throw new Error(`O campo 'password' deve ter pelo menos 6 caracteres.`);
    }
    if (typeof role !== "string" || role.length < 4) {
      throw new Error(
        `O campo 'role' deve ser uma string com pelo menos 4 caracteres`
      );
    }

    const userDatabase = new UserDatabase();
    const userDBExists = await userDatabase.findUserById(id);

    if (userDBExists) {
      throw new Error("'id' já existente");
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
  };

  public updateUsers = async (input: any) => {
    const { id, name, email, password, role } = input;

    if (typeof id !== "string" || id.length < 4) {
      throw new Error(
        "O campo 'id' deve ser uma string com pelo menos 4 caracteres"
      );
    }

    if (typeof name !== "string" || name.length < 3) {
      throw new Error(
        "O campo 'nome' deve ser uma string com pelo menos 3 caracteres"
      );
    }

    if (!email || !email.includes("@")) {
      throw new Error(`O campo 'email' deve ser um endereço de e-mail válido`);
    }

    if (typeof password !== "string" || password.length < 6) {
      throw new Error(`O campo 'password' deve ter pelo menos 6 caracteres.`);
    }
    if (typeof role !== "string" || role.length < 4) {
      throw new Error(
        `O campo 'role' deve ser uma string com pelo menos 4 caracteres`
      );
    }

    const userDatabase = new UserDatabase();
    const userDBExists = await userDatabase.findUserById(id);

    if (!userDBExists) {
      throw new Error("Usuário não econtrado");
    }

    userDBExists.name = name;
    userDBExists.email = email;
    userDBExists.password = password;
    userDBExists.role = role;

    await userDatabase.updateUser(userDBExists);

    return userDBExists;
  };

  public deleteUsers = async (input: any) => {
    const { id } = input;

    if (typeof id !== "string") {
      throw new Error("O campo 'id' deve ser umas string");
    }

    const userDatabase = new UserDatabase();
    const userDBExists = await userDatabase.findUserById(id);

    if (!userDBExists) {
      throw new Error("Não foi possível encontrar o usuário");
    }

    await userDatabase.deleteUser(id);

    return userDBExists;
  };
}
