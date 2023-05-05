// export const knexFile = {
//   client: "sqlite3",
//   connection: {
//     filename:
//       "./src/dataBase/labook.db" ||
//       (() => {
//         throw new Error("DATABASE_URL não definido");
//       })(),
//   },
//   useNullAsDefault: true,
//   pool: {
//     min: 0,
//     max: 1,
//     afterCreate: (conn: any, cb: any) => {
//       conn.run("PRAGMA foreign_keys = ON", cb);
//     },
//   },
// };
