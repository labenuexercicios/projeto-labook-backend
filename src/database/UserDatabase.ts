import { UserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "users";

  public async findUsers(q: string | undefined) {
    let usersDB;

    if (q) {
      const result: UserDB[] = await BaseDatabase.connection(
        UserDatabase.TABLE_USERS
      ).where("name", "LIKE", `%${q}%`);

      usersDB = result;
    } else {
      const result: UserDB[] = await BaseDatabase.connection(
        UserDatabase.TABLE_USERS
      );

      usersDB = result;
    }
    return usersDB;
  }

  public async findUserById(id: string) {
    const [usersDB]: UserDB[] | undefined[] = await BaseDatabase.connection(
      UserDatabase.TABLE_USERS
    ).where({ id });

    return usersDB;
  }
}
