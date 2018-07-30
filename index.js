const db = require("./data/db");
const express = require("express");
const server = express();
const bodyParser = require("body-parser");

server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.get("/hobbits", (req, res) => {
  const hobbits = [
    {
      id: 1,
      name: "Samwise Gamgee"
    },
    {
      id: 2,
      name: "Frodo Baggins"
    }
  ];

  res.status(200).json(hobbits);
});

// POST Request
server.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }

  db.insert({
    name: req.body.name,
    bio: req.body.bio,
    created_at: Date.now(),
    updated_at: Date.now()
  })
    .then(id => res.status(201).json(id))
    .catch(error =>
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      })
    );
});

// GET Request
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => res.status(200).json(users))
    .catch(error =>
      res
        .status(500)
        .json({ error: "The users information could not be retrieved" })
    );
});

// GET by id
server.get("/api/users/:id", (req, res) => {
  db.findById(Number(req.params.id))
    .then(user => {
      if (typeof user === "Array" && user.length === 0) {
        return res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      }
      return res.status(200).json(user[0]);
    })
    .catch(error =>
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." })
    );
});

// DELETE
server.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  db.findById(id)
    .then(user => {
      if (typeof user === "Array" && user.length === 0) {
        return res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      }
      db.remove(id)
        .then(n => res.status(200).json(user[0]))
        .catch(error =>
          res
            .status(500)
            .json({ error: "The user information could not be retrieved" })
        );
    })
    .catch(error =>
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." })
    );
});

// PUT Request
server.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  db.update(id, {
    name: req.body.name,
    bio: req.body.bio
  })
    .then(n => {
      db.findById(id)
        .then(user => res.status(200).json(user[0]))
        .catch(error =>
          res
            .status(500)
            .json({ error: "The user information could not be retrieved" })
        );
    })
    .catch(error =>
      res.status(500).json({ error: "The user could  not be updated" })
    );
});

server.listen(8000, () => console.log("API running on port 8000"));
