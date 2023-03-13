"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    findUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            let usersDB;
            const result = yield BaseDatabase_1.BaseDatabase
                .connection(UserDatabase.TABLE_USERS);
            usersDB = result;
            return usersDB;
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [userDB] = yield BaseDatabase_1.BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .where({ id });
            return userDB;
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const [userDB] = yield BaseDatabase_1.BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .where({ email });
            return userDB;
        });
    }
    insertUser(newUserDB) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .insert(newUserDB);
        });
    }
}
exports.UserDatabase = UserDatabase;
UserDatabase.TABLE_USERS = "users";
