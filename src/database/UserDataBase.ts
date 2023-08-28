import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  
  public static TABLE_USERS = "users"

  public insertUser = async (input: UserDB):Promise<void> => {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .insert(input)
  }

  
  public getUsers = async () => {

      const result: UserDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select()

      return result

  }

  public findUserByName = async (name: string | undefined) => {

      const userDB: UserDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select()
        .where("name", "LIKE", `%${name}%`)

      return userDB
  }
  

  public findUserById = async (id: string) => {
    const [userDB]: UserDB[] | undefined[] = await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .select()
      .where({ id })

    return userDB
  }

  public findUserByEmail = async (email: string) => {
    const [userDB]: UserDB[] | undefined[] = await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .select()
      .where({ email })

    return userDB
  }

  public updateUserById = async (id: string, userDB: UserDB) => {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .update(userDB)
      .where({ id })
  }

  public deleteUserById = async (id: string) => {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .delete()
      .where({ id })
  }

  public updateUserRoleById = async (id: string, userDB: UserDB) => {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .update(userDB)
      .where({ id })
  }
}
