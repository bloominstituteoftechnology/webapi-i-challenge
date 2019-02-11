// implement your API here

const express = require('express');

const db = require('./data/db');

const server = express();

server.get("/", (req, res) => {
  res.send("<h2>Hello From Local Host</h2>");
});

server.listen(4000, () => {
  console.log("\n*** Running on port 4000 ***\n");
})