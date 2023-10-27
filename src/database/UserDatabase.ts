import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";
export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public findbyEmail = async (email: string): Promise<UserDB | undefined> => {
        const [userDB]: UserDB[] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).select().where({ email: email })
        return userDB
    }

    public findbyId = async (id: string): Promise<UserDB> => {
        const [userDB]: UserDB[] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).select().where({ id: id })
        return userDB
    }
    public insertUser = async (userDB: UserDB): Promise<void> => {
        await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(userDB)
    }
}