const express = require("express");
const cors = require("cors");
const router = require("./src/routers/server-routes.js");
const path = require('path');
const dotenv = require('dotenv').config();
const publicDirectoryPath=path.join(__dirname,'public');

const port = process.env.POgitRT || 8080;

const server = express();

server.use(cors());
server.use(express.static(publicDirectoryPath))
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use("/", router);
server.get("/", (req, res) => res.send("success"));



server.listen(port, () => {
  console.log(`local server started on http://localhost:${port}`);
});
