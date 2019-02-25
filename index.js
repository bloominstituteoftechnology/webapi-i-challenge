// implement your API here
const express = require("express");
const server = express();
const port = 8000;

const db = require("./data/db");

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => res.json(users))
    .catch(error => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      user
        ? res.status(200).json(user)
        : res
            .status(404)
            .json({
              message: "The user with the specified ID does not exist."
            });
    })
    .catch(error => res.status(500).json({ message: "failed to get user" }));
});

server.listen(port, () => {
  console.log(`starting server on ${port}`);
});
