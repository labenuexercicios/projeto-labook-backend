import { userDB } from "../types";
import { baseDatabase } from "../database/databBase1";;

export class userDatabase extends baseDatabase {
    public static TABLE_USERS = "users"

    public async findUserById(id: string): Promise<userDB|undefined> {
        const [result] = await baseDatabase.connection(userDatabase.TABLE_USERS).where({ id })
        if (!result) {
            return undefined
        }
        const user: userDB = {
            id: result.id,
            name: result.name,
            email: result.email,
            password: result.password,
            role: result.role,
            created_at: result.created_at
        }
        return user
    }

    public async findUserByEmail(email: string): Promise<userDB>{
        const [result] = await baseDatabase.connection(userDatabase.TABLE_USERS).where({email})
        return result as userDB
    }

    public async creatUser(newuserDB: userDB): Promise<void> {
        await baseDatabase.connection(userDatabase.TABLE_USERS).insert(newuserDB)
    }

    public async findUser(): Promise<userDB[]>{
       const result: userDB[] = await baseDatabase.connection(userDatabase.TABLE_USERS)
       return result
    }
}