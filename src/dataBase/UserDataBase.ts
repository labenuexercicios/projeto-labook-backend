import { UserDB } from "../models/User";
import { BaseDataBase } from "./BaseDataBase";

export class UserDatabase extends BaseDataBase {
  public static TABLE_USERS = "users";

  public getUsers = async () => {
    const users = await BaseDataBase.connection(UserDatabase.TABLE_USERS);
    return users;
  };

  public signUp = async (newUserDB: UserDB) => {
    await BaseDataBase.connection(UserDatabase.TABLE_USERS).insert(newUserDB);
  };

  public findUSerByEmail = async (email: string): Promise<UserDB> => {
    const [userDB]: UserDB[] = await BaseDataBase.connection(
      UserDatabase.TABLE_USERS
    ).where({ email: email });

    return userDB;
  };
}
