const express = require("express");

const bodyParser = require("body-parser");

const db = require("./data/db.js");

const server = express();

server.use(bodyParser.json());

// server.get("/", function(req, res) {
//   res.json({ api: "API Running........" });
// });

server.get("/api/users", function(req, res) {
  // get data
  db
    .find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json('{ error: "The user information could not be retrieved." }');
    });
});

server.get("/api/users/:id", function(req, res) {
  const { id } = req.params;

  if (db.findById(id)) {
    res
      .status(404)
      .json('{ message: "The user with the specified ID does not exist." }');
  }

  db
    .findById(id)
    .then(user => {
      res.json(user[0]);
    })
    .catch(err => {
      res
        .status(500)
        .json('{ error: "The user information could not be retrieved." }');
    });
});

server.post("/api/users", function(req, res) {
  const { name, bio } = req.body;
  const user = { name, bio };

  if (!user) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }

  db
    .insert(user)
    .then(x => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving user to the database."
      });
    });
});

const port = 5001;
server.listen(port, () => console.log("API Running on port 5001"));
