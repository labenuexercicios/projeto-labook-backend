import { Request, Response } from "express";
import { UserDatabase } from "../database/UserDatabase";
import { User } from "../models/users";
import { UserDB } from "../types";

export class UserController {
  public getUsers = async (req: Request, res: Response) => {
    try {
      const q = req.query.q as string | undefined;

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
      res.status(200).send(users);
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public createUsers = async (req: Request, res: Response) => {
    try {
      const { id, name, email, password, role } = req.body;

      if (typeof id !== "string" || id.length < 4) {
        res.statusCode = 404;
        throw new Error(
          "O campo 'id' deve ser uma string com pelo menos 4 caracteres"
        );
      }

      if (typeof name !== "string" || name.length < 3) {
        res.statusCode = 404;
        throw new Error(
          "O campo 'nome' deve ser uma string com pelo menos 3 caracteres"
        );
      }

      if (!email || !email.includes("@")) {
        res.statusCode = 404;
        throw new Error(
          `O campo 'email' deve ser um endereço de e-mail válido`
        );
      }

      if (typeof password !== "string" || password.length < 6) {
        res.statusCode = 404;
        throw new Error(`O campo 'password' deve ter pelo menos 6 caracteres.`);
      }
      if (typeof role !== "string" || role.length < 4) {
        res.statusCode = 404;
        throw new Error(
          `O campo 'role' deve ser uma string com pelo menos 4 caracteres`
        );
      }

      const userDatabase = new UserDatabase();
      const userDBExists = await userDatabase.findUserById(id);

      if (userDBExists) {
        res.status(400);
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
      res.status(201).send(newUser);
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public updateUsers = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, email, password, role } = req.body;

      if (typeof id !== "string" || id.length < 4) {
        res.statusCode = 404;
        throw new Error(
          "O campo 'id' deve ser uma string com pelo menos 4 caracteres"
        );
      }

      if (typeof name !== "string" || name.length < 3) {
        res.statusCode = 404;
        throw new Error(
          "O campo 'nome' deve ser uma string com pelo menos 3 caracteres"
        );
      }

      if (!email || !email.includes("@")) {
        res.statusCode = 404;
        throw new Error(
          `O campo 'email' deve ser um endereço de e-mail válido`
        );
      }

      if (typeof password !== "string" || password.length < 6) {
        res.statusCode = 404;
        throw new Error(`O campo 'password' deve ter pelo menos 6 caracteres.`);
      }
      if (typeof role !== "string" || role.length < 4) {
        res.statusCode = 404;
        throw new Error(
          `O campo 'role' deve ser uma string com pelo menos 4 caracteres`
        );
      }

      const userDatabase = new UserDatabase();
      const userDBExists = await userDatabase.findUserById(id);

      if (!userDBExists) {
        res.status(400);
        throw new Error("Usuário não econtrado");
      }

      userDBExists.name = name;
      userDBExists.email = email;
      userDBExists.password = password;
      userDBExists.role = role;

      await userDatabase.updateUser(userDBExists);
      res.status(201).send("Usuário atualizado com sucesso");
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public deleteUsers = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (typeof id !== "string") {
        res.statusCode = 404;
        throw new Error("O campo 'id' deve ser umas string");
      }

      const userDatabase = new UserDatabase();
      const userDBExists = await userDatabase.findUserById(id);

      if (!userDBExists) {
        res.statusCode = 404;
        throw new Error("Não foi possível encontrar o usuário");
      }

      await userDatabase.deleteUser(id);
      res.status(201).send("Usuário deletado com sucesso");
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };
}
