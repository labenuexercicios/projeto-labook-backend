// Importa o knex e o dotenv
import { knex } from "knex";
import dotenv from "dotenv";

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Classe abstrata que serve como base para as classes de banco de dados
export abstract class BaseDatabase {
  // Propriedade estática que armazena a conexão com o banco de dados
  protected static connection = knex({
    client: "sqlite3", // Define o cliente de banco de dados como SQLite
    connection: {
      filename: process.env.DB_FILE_PATH as string, // Obtém o caminho do arquivo de banco de dados a partir das variáveis de ambiente
    },
    useNullAsDefault: true, // Utiliza o valor nulo como padrão
    pool: {
      min: 0, // Define o tamanho mínimo da pool de conexões como 0
      max: 1, // Define o tamanho máximo da pool de conexões como 1
      afterCreate: (conn: any, cb: any) => {
        // Função executada após a criação de cada conexão
        conn.run("PRAGMA foreign_keys = ON", cb); // Executa uma instrução SQL para ativar as chaves estrangeiras
      },
    },
  });
}
