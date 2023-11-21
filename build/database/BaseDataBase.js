"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDatabase = void 0;
const knex_1 = require("knex");
class BaseDatabase {
}
exports.BaseDatabase = BaseDatabase;
BaseDatabase.connection = (0, knex_1.knex)({
    client: "sqlite3",
    connection: {
        filename: "./src/database/labook.db",
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
//# sourceMappingURL=BaseDataBase.js.map