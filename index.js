// set a port for the server
const port = "8000";
// import the db (data manager file)
const db = require("./data/db");
// imporer texpress in to the server api
const express = require("express");
// import cors to use local server and react connections
const cors = require("cors");

const server = express(); // instantiate an express server

server.use("cors");

// skeleton for get all users TODO: add some status and error handling
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

// skeleton for get specific user based upon id TODO: add some status and error handling
server.get("/api/users/:id", (req, res) => {
  db.findById(req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(err =>
      res.json({ error: "The user information could not be retrieved." })
    );
});

// skeleton for add new user TODO: fill in logic
server.post("/api/users", (req, res) => {});

// skeleton for delete user based upon id TODO: fill in logic
server.delete("/api/users/:id", (req, res) => {});

// listent to port using the server
server.listen(port, () =>
  console.log(`\n=== Server listening on port: ${port}`)
);
