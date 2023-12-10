import { TUserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "users";

  public async findUsers(q: string | undefined): Promise<TUserDB[]> {
    let usersDB: TUserDB[];

    if (q) {
      const result: TUserDB[] = await BaseDatabase
        .connection("UserDatabase.TABLE_USERS")
        .where("name", "LIKE", `%${q}%`);

      usersDB = result;
    } else {
      const result: TUserDB[] = await BaseDatabase
        .connection("UserDatabase.TABLE_USERS")
      usersDB = result;
    }
    return usersDB;
  }

  public async addUser(user: TUserDB): Promise<void> {
    await BaseDatabase
      .connection("UserDatabase.TABLE_USERS")
      .insert(user);
  }
}
