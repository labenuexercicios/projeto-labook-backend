import { BaseDatabase } from "./BaseDataBase";
import { users } from "./dataBase";
import { TUsers } from "../types";

export class UserDataBase extends BaseDatabase {
    public static TABLE_USERS = 'users'
    public async postUser(name: string, email: string, password: string)
{
   
    const dbTUsers = {
        // id: Id,
        name: name,
        email: email,
        password: password,
        // role: role
    }

    await BaseDatabase.connection(UserDataBase.TABLE_USERS).insert(dbTUsers) 
    const [ usersdb ]: TUsers[] = await BaseDatabase.connection(UserDataBase.TABLE_USERS)
}
}