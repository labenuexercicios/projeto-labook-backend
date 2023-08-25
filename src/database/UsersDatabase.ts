import { UserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UsersDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"
    public static TABLE_LIKEDISLIKES = "like_dislikes"

    public async findUsers (q: string | undefined){

        let usersDB

        if(q) {
            const result = await BaseDatabase.connection(UsersDatabase.TABLE_USERS).where("content", "LIKE", `%${q}`)
            usersDB = result
        } else {
            const result = await BaseDatabase.connection(UsersDatabase.TABLE_USERS)
            usersDB = result
        }
        return usersDB;
    }

    public async findUserById(id: string | undefined) : Promise <UserDB | undefined>{
        const userDBExist: UserDB[] | undefined[] = await BaseDatabase
        .connection(UsersDatabase.TABLE_USERS)
        .select()
        .where({id: id})
        
        return userDBExist[0]
    }

    public async findUserByEmail(email: string | undefined): Promise <UserDB | undefined>{
        const emailUserDBExist: UserDB[] | undefined[] = await BaseDatabase
        .connection (UsersDatabase.TABLE_USERS)
        .select()
        .where({email})

        return emailUserDBExist[0]
    }

    public async insertUser(newUserDB: UserDB): Promise <void>{
        await BaseDatabase.connection(UsersDatabase.TABLE_USERS).insert(newUserDB)

    }

    public async updateUserById(newUserDB: UserDB): Promise <void>{
        await BaseDatabase
        .connection(UsersDatabase.TABLE_USERS)
        .update(newUserDB)
        .where({id: newUserDB.id})
    }

    public async deleteUser(id: string){

        await BaseDatabase
        .connection(UsersDatabase.TABLE_LIKESDISLIKES)
        .del()
        .where({user_id:id})

        await BaseDatabase
        .connection(UsersDatabase.TABLE_USERS)
        .del()
        .where({id})    
    }

}