// implement your API here
const express = require("express");
const cors = require("cors");

const server = express();
server.use(express.json());
server.use(cors());

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

server.post("/api/users", (req, res) => {
  db.insert(req.body)
    .then(user => res.status(201).json(user))
    .catch(error =>
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      })
    );
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      user
        ? res.status(200).json(user)
        : res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
    })
    .catch(error => res.status(500).json({ message: "failed to get user" }));
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;

  //if the name or the bio does not exist
  !name || !bio
    ? res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." })
    : // else continue updating user
      db
        .update(id, req.body)
        .then(user => {
          //if the user is successfully updated
          if (user) {
            // return successfully updated user
            db.findById(id).then(user => res.status(200).json(user));
          } else {
            res.status(404).json({
              message: "The user with the specified ID does not exist."
            });
          }
        })
        .catch(error =>
          res
            .status(500)
            .json({ error: "The user information could not be modified." })
        );
});

server.delete("/api/users/:id", (req, res) => {
  db.remove(req.params.id)
    .then(numDeleted => {
      numDeleted
        ? res.status(200).json({ numDeleted })
        : res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
    })
    .catch(error =>
      res.status(500).json({ error: "The user could not be removed" })
    );
});

server.listen(port, () => {
  console.log(`starting server on ${port}`);
});
