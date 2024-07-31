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
  //debug: true
});


console.log("Connection db ok");
