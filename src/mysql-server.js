const mysql = require("mysql2/promise");
const mysqlServer = mysql.createPool({
  host: "db4free.net",
  port: 3306,
  user: "group6rihs",
  password: "group6rihs",
  database: "ihsadatabase",
  connectionLimit: 100,
  multipleStatements: true,
});

module.exports = mysqlServer;
