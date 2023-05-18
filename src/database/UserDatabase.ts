import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UsersDatabase extends BaseDatabase {
  public static TABLE_USERS = "users"

  public async insertUser(newUserDB: UserDB): Promise<void> {
    await BaseDatabase
      .connection(UsersDatabase.TABLE_USERS)
      .insert(newUserDB)
  }

  public async getUsers(query: string | undefined): Promise<UserDB[]> {

    if (query) {
      const result: UserDB[] = await BaseDatabase
        .connection(UsersDatabase.TABLE_USERS)
        .where("name", "LIKE", `%${query}%`)

      return result
    } else {
      const result: UserDB[] = await BaseDatabase
        .connection(UsersDatabase.TABLE_USERS)

      return result
    }

  }

  public async getUserByEmail(email: string): Promise<UserDB | undefined> {
    const [result]: UserDB[] = await BaseDatabase
      .connection(UsersDatabase.TABLE_USERS)
      .where({ email: email })

    return result
  }

  public async getUserById(id: string): Promise<UserDB | undefined> {
    const [result]: UserDB[] = await BaseDatabase
      .connection(UsersDatabase.TABLE_USERS)
      .where({ id: id })

    return result
  }

  public async editUserById(id: string, userDB: UserDB): Promise<void> {
    await BaseDatabase
      .connection(UsersDatabase.TABLE_USERS)
      .update(userDB)
      .where({ id: id })
  }

  public async deleteUserById(id: string): Promise<void> {
    await BaseDatabase
      .connection(UsersDatabase.TABLE_USERS)
      .del().where({ id: id })
  }
}