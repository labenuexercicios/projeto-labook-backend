import { UserDB } from "../types";
import { BaseDatabase } from "./BaseData";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users";

    public async findUsers() {
        const result: UserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS);

        return result;
    }

    public async findUserById(id: string) {
        const [userDB]: UserDB[] | undefined[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ id });

        return userDB;
    }

    public async findUserByEmail(email: string) {
        const [userDB]: UserDB[] | undefined[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ email });

        return userDB;
    }

    public async insertUser(newUserDB: UserDB) {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(newUserDB);
    }
}