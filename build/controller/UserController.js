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
class UserController {
    constructor(userBusiness) {
        this.userBusiness = userBusiness;
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    q: req.query.q
                };
                const output = yield this.userBusiness.getUsers(input);
                res.status(200).send(output);
            }
            catch (error) {
                console.log(error);
                if (req.statusCode === 200) {
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
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                };
                const output = yield this.userBusiness.signup(input);
                res.status(201).send(output);
            }
            catch (error) {
                console.log(error);
                if (req.statusCode === 200) {
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
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    email: req.body.email,
                    password: req.body.password
                };
                const output = yield this.userBusiness.login(input);
                res.status(200).send(output);
            }
            catch (error) {
                console.log(error);
                if (req.statusCode === 200) {
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
