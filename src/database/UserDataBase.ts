import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  
  private static TABLE_USERS = "users"

  public insertUser = async (input: UserDB):Promise<void> => {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .insert(input)
  }

  public findUsers = async (name?: string | undefined) => {

    if (name) {
      const result: UserDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .where("name", "LIKE", `%${name}%`)

      return result

    } else {
      const result: UserDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)

      return result
    }
  }

  public findUserByEmail = async (email: string) => {
    const [userDB]: UserDB[] | undefined[] = await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .where({ email })

    return userDB
  }

  public updateUserByEmail = async (emailToEdit: string, userDB: UserDB) => {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .update(userDB)
      .where({ email: emailToEdit })
  }

  public deleteUserByEmail = async (emailToDelete: string) => {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .delete()
      .where({ email: emailToDelete })
  }
}
