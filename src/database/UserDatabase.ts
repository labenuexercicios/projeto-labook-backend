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

  public async insertUser(newUserDB: UserDB) {
    await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(newUserDB);
  }

  public async updateUser(newUser: UserDB) {
    await BaseDatabase.connection(UserDatabase.TABLE_USERS)
      .where({ id: newUser.id })
      .update({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
      });
  }

  public async deleteUser(id: string) {
    await BaseDatabase.connection(UserDatabase.TABLE_USERS)
      .where({ id })
      .delete();
  }
}
