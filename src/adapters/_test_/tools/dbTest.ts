import knex from "knex";

export const dbTest = knex({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "password",
    database: "stock_manager",
  },
  debug: true
});

dbTest.on('query', queryData => {
  console.log("==========>", {
    sql: queryData.sql,
    bindings: queryData.bindings ? queryData.bindings.join(', ') : ''
  });
});

console.log("Connection db ok");
