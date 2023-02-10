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
exports.UserController = void 0;
const userDataBase_1 = require("../database/userDataBase");
class UserController {
    constructor() {
        this.createUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                if (typeof name !== "string") {
                    res.status(201);
                    throw new Error("'name' deve ser uma string");
                }
                if (typeof email !== "string") {
                    res.status(201);
                    throw new Error("'email' deve ser uma string");
                }
                if (typeof password !== "string") {
                    res.status(201);
                    throw new Error("'password' deve ser uma string");
                }
                const usersDataBase = new userDataBase_1.UserDataBase();
                const usersdb = usersDataBase.postUser(name, email, password);
                res.status(201).send(`created ${usersdb}`);
            }
            catch (error) {
                console.log(error);
                if (req.statusCode === 201) {
                    res.status(500);
                }
                if (error instanceof Error) {
                    res.send(error.message);
                }
                else {
                    res.send("Erro inesperado");
                }
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map