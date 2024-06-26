const mysql = require("mysql2");
const knex = require("knex");
require("dotenv").config();

const node_env = process.env.NODE_ENV;

const mySQLConnection = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
};

const knexClientConfig = {
  client: "mysql2",
  connection: mySQLConnection,
};

const knexClient = knex(knexClientConfig);
module.exports = { knexClient };
