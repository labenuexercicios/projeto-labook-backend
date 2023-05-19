import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UsersDatabase extends BaseDatabase {
  public static TABLE_USERS = "users";

  // Insere um novo usuário no banco de dados
  public async insertUser(newUserDB: UserDB): Promise<void> {
    await BaseDatabase
      .connection(UsersDatabase.TABLE_USERS)
      .insert(newUserDB);
  }

  // Obtém os usuários do banco de dados de acordo com uma consulta opcional
  public async getUsers(query: string | undefined): Promise<UserDB[]> {
    if (query) {
      // Realiza uma busca pelos usuários que correspondem à consulta informada
      const result: UserDB[] = await BaseDatabase
        .connection(UsersDatabase.TABLE_USERS)
        .where("name", "LIKE", `%${query}%`);

      return result;
    } else {
      // Obtém todos os usuários do banco de dados
      const result: UserDB[] = await BaseDatabase
        .connection(UsersDatabase.TABLE_USERS);

      return result;
    }
  }

  // Obtém um usuário pelo seu email
  public async getUserByEmail(email: string): Promise<UserDB | undefined> {
    const [result]: UserDB[] = await BaseDatabase
      .connection(UsersDatabase.TABLE_USERS)
      .where({ email: email });

    return result;
  }

  // Obtém um usuário pelo seu ID
  public async getUserById(id: string): Promise<UserDB | undefined> {
    const [result]: UserDB[] = await BaseDatabase
      .connection(UsersDatabase.TABLE_USERS)
      .where({ id: id });

    return result;
  }

  // Edita um usuário pelo seu ID
  public async editUserById(id: string, userDB: UserDB): Promise<void> {
    await BaseDatabase
      .connection(UsersDatabase.TABLE_USERS)
      .update(userDB)
      .where({ id: id });
  }

  // Deleta um usuário pelo seu ID
  public async deleteUserById(id: string): Promise<void> {
    await BaseDatabase
      .connection(UsersDatabase.TABLE_USERS)
      .del()
      .where({ id: id });
  }
}
