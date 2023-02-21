"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDatabase = void 0;
const knex_1 = require("knex");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class BaseDatabase {
}
exports.BaseDatabase = BaseDatabase;
BaseDatabase.connection = (0, knex_1.knex)({
    client: "sqlite3",
    connection: {
        filename: process.env.DB_FILE_PATH,
    },
    useNullAsDefault: true,
    pool: {
        min: 0,
        max: 1,
        afterCreate: (conn, cb) => {
            conn.run("PRAGMA foreign_keys = ON", cb);
        }
    }
});
