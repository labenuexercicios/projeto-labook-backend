import knex from 'knex';

const database = knex({
  client: 'sqlite3',
  connection: {
    filename: '../database',
  },
  useNullAsDefault: true,
});

export default database;
