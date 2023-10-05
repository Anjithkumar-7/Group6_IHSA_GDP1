const mysql = require("mysql2/promise");
const mysqlServer = mysql.createPool({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "",
  database: "rihs",
  connectionLimit: 100,
  multipleStatements: true,
});

module.exports = mysqlServer;
