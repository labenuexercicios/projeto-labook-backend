import { TUserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "users";

  public async findUsers(q: string | undefined) {
    let usersDB;

    if (q) {
      const result: Array<TUserDB> = await BaseDatabase.connection(
        UserDatabase.TABLE_USERS
      ).where("name", "LIKE", `%${q}%`);
      usersDB = result;
    } else {
      const result: Array<TUserDB> = await BaseDatabase.connection(
        UserDatabase.TABLE_USERS
      );

      usersDB = result;
    }
    return usersDB;
  }
  public async findUserById(id: string): Promise<TUserDB | undefined> {
    const [userDB]: Array<TUserDB | undefined> = await BaseDatabase.connection(UserDatabase.TABLE_USERS).where('id', id)
    return userDB
  }

  public async insertUser(userDb: TUserDB): Promise<void> {
    await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(userDb)
  }

  public async updateUser(userDb: TUserDB, id: string): Promise<void> {
    await BaseDatabase.connection(UserDatabase.TABLE_USERS).update(userDb).where('id', id)
  }

  public async deleteUser(userDb: any, id: string): Promise<void> {
    await BaseDatabase.connection(UserDatabase.TABLE_USERS).del(userDb).where('id', id)
  }
}
