// implement your API here

//Libraries
const express = require("express");

//Database
const db = require("./data/db.js");

//Global variable for server
const server = express();

//Middleware
server.use(express.json());
server.use(cors())

//Request Handlers

//GET
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        error: "There was an error while saving the user to the database"
      });
    });
});

//GET/:id
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        error: "The user information could not be retrieved"
      });
    });
});

//PUT /:id
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (changes.name && changes.bio) {
    db.update(id, changes)
      .then(updatedUser => {
        if (updatedUser === 1) {
            res.status(200).json(changes)
        } else {
            res.status(500).json({
                err: err,
                error: "The user information could not be modified"
              });
        }
      })
      .catch(err => {
        res.status(404).json({
          err: err,
          error: "The user with the specified ID does not exist"
        });
      });
  } else {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user"
    });
  }
});

//POST
server.post("/api/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name && newUser.bio) {
    db.insert(newUser)
      .then(userID => {
        res.status(201).json(userID);
      })
      .catch(err => {
        res.status(500).json({
          err: err,
          error: "There was an error while saving the user to the database"
        });
      });
  } else {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user"
    });
  }
});

//DELETE /:id
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(deleted => {
        if (deleted < 1) {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        } else {
            res.status(200).json(id)
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: "The user could not be removed"
        })
    });
});

//Listen
server.listen(4000, () => {
  console.log("Server is running on port 4000...");
});
