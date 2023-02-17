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
exports.UserDataBase = void 0;
const BaseDataBase_1 = require("./BaseDataBase");
class UserDataBase extends BaseDataBase_1.BaseDatabase {
    postUser(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbTUsers = {
                name: name,
                email: email,
                password: password,
            };
            yield BaseDataBase_1.BaseDatabase.connection(UserDataBase.TABLE_USERS).insert(dbTUsers);
            const [usersdb] = yield BaseDataBase_1.BaseDatabase.connection(UserDataBase.TABLE_USERS);
        });
    }
}
exports.UserDataBase = UserDataBase;
UserDataBase.TABLE_USERS = 'users';
//# sourceMappingURL=userDataBase.js.map