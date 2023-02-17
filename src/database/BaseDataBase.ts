import knex from "knex";
import dotenv from 'dotenv'

dotenv.config()

export abstract class BaseDataBase {
  protected static connection = knex({
    client: "sqlite3",
    connection: {
      filename: process.env.DB_FILE_PATH as string, //localização do seu arquivo .db
    },
    useNullAsDefault: true, // definirá NULL quando encontrar valores undefined
    pool: {
      min: 0, // número de conexões, esses valores são os recomendados para sqlite3
      max: 1,
      afterCreate: (conn: any, cb: any) => {
        conn.run("PRAGMA foreign_keys = ON", cb);
      }, // configurando para o knex forçar o check das constrainst FK
      // para entender melhor, depois assista o vídeo de refatoração de DELETE users by id
    },
  });
}
