import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  
  public static TABLE_USERS = "users"

  public insertUser = async (input: UserDB):Promise<void> => {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .insert(input)
  }

  
  public getUsers = async (
    name: string | undefined
  ): Promise<UserDB[]> => {
    
let usersDB
    
    if (q) {
      const result: UserDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .where("name", "LIKE", `%${name}%`)
      usersDB = result
    } else {
      const result: UserDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
      usersDB = result
    }
    return usersDB
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
