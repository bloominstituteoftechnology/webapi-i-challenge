// implement your API here

const express = require("express");

const db = require("./data/db");

const server = express();

server.get("/", (req, res) => {
  res.send("<h2>Hello From Local Host</h2>");
});

// GET
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(201).json({ success: true, users });
    })
    .catch(({ code, message }) => {
      res.status(code).json({ success: false, message });
    });
});

server.listen(4000, () => {
  console.log("\n*** Running on port 4000 ***\n");
});
