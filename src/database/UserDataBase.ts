import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDataBase";

export class UserDataBase extends BaseDatabase {
  public static TABLE_USERS = "users";

  public async findByEmail(email: string): Promise<UserDB | undefined> {
    
    
    const [userDB]: UserDB[] | undefined[] = await BaseDatabase
    .connection(UserDataBase.TABLE_USERS)
    .where({ email })

  return userDB
    
    
    
  }
  public async signup(newUser: UserDB): Promise<void> {
    await BaseDatabase.connection(UserDataBase.TABLE_USERS).insert(newUser);
  }
}
