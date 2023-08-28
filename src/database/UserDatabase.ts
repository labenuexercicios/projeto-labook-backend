import { BaseDatabase } from "./BaseDatabase";
import { UserDB } from "../models/User"

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public async insertUser(newUserDB: UserDB) {
        await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(newUserDB)
    }

    public async findUsers(q: string | undefined) {
        if (q) {
            const result: UserDB[] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).where("name", "LIKE", `%${q}%`)
            return result
        } else {
            const result: UserDB[] = await BaseDatabase.connection(UserDatabase.TABLE_USERS)
            return result
        }
    }
    public async findUserById(id: string) {
        const [userDB]: UserDB[] | undefined[] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).where({id})
        return userDB
    }
    public async findUserByEmail(email:string):Promise<UserDB | undefined> {
        const [userDB]:UserDB[] | undefined[] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).where({email})
        return userDB
    }
}