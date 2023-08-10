import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "users"

  public async insertUser(newUserDB: UserDB) {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .insert(newUserDB)
  }

  public async findUsers(q: string | undefined) {
    if (q) {
      const result: UserDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .where("name", "LIKE", `%${q}%`)

      return result

    } else {
      const result: UserDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)

      return result
    }
  }

  public async findUserById(id: string) {
    const [userDB]: UserDB[] | undefined[] = await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .where({ id })

    return userDB
  }

  public async updateUserById(idToEdit: string, userDB: UserDB) {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .update(userDB)
      .where({ id: idToEdit })
  }

  public async deleteUserById(idToDelete: string) {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .delete()
      .where({ id: idToDelete })
  }
}
