import { UserDB } from "../interfaces/types";
import { BaseDataBase } from "./BaseDataBase";

export class UserDataBase extends BaseDataBase {
  public static TABLE_USERS = "users";

  public insert = async (userDB: UserDB): Promise<void> => {
    await BaseDataBase.connection(UserDataBase.TABLE_USERS).insert(userDB);
  };

  public findByEmail = async (email: string): Promise<UserDB | undefined> => {
    const result: UserDB[] = await BaseDataBase.connection(
      UserDataBase.TABLE_USERS
    )
      .select()
      .where({ email });
    return result[0];
  };
}
