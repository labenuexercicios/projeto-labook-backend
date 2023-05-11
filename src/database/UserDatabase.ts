import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "users";

  public async postUser(newUser: UserDB): Promise<void> {
    await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(newUser);
  }

  public async findUserByEmail(email: string): Promise<UserDB | undefined> {
    const [userDB]: UserDB[] | undefined[] = await BaseDatabase.connection(
      UserDatabase.TABLE_USERS
    ).where({ email });
    return userDB;
  }
}
