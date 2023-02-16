import { TUser } from "../models/types";
import { BaseDatabase } from "./BaseDataBase";



export class UserDataBase extends BaseDatabase{

    public static TABLE_USERS = "users"

    public async findGetUsers(){
        const result: TUser[] = await BaseDatabase
        .conection(UserDataBase.TABLE_USERS)

        return result
    }



    public async findPostUser(id: string){
        const [userExists]: TUser[] | undefined[] = await BaseDatabase
        .conection(UserDataBase.TABLE_USERS)
        .where({ id });

        return userExists
    }


    public async findPostUserEmail(email: string){
        const [emailExists]: TUser[] | undefined[] = await BaseDatabase
        .conection(UserDataBase.TABLE_USERS)
        .where({ email });

        return emailExists
    }


    public async insertPostUser(newUser: TUser){
        await BaseDatabase
        .conection(UserDataBase.TABLE_USERS)
        .insert(newUser)
    }


    public async findPostUserPassword(password: string){
        const [passwordExists]: TUser[] | undefined[] = await BaseDatabase
        .conection(UserDataBase.TABLE_USERS)
        .where({ password: password });

        return passwordExists
    }
}