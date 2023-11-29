// const mysql = require("mysql2/promise");
// const mysqlServer = mysql.createPool({
//   host: "db4free.net",
//   port: 3306,
//   user: "group6rihs",
//   password: "group6rihs",
//   database: "ihsadatabase",
//   connectionLimit: 100,
//   multipleStatements: true,
// });

// module.exports = mysqlServer;


const mysql = require("mysql2/promise");
const mysqlServer = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Sumaavs@98",
  database: "rihs",
  connectionLimit: 100,
  multipleStatements: true,
});

module.exports = mysqlServer;
