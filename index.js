// implement your API here

const express = require("express");
const cors = require("cors");

const db = require("./data/db");

const server = express();
const PORT = "9090";

// parses the body and adds it to req.body
// important to have can have unique name
server.use(express.json());

// endpoints

server.get("/api/users", (req, res) => {
  const name = req.params.name;
  db.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ err: "The users information could not be retrieved." });
    });
});

server.get("/api/users/:id", (req, res) => {
  // gets a specific user by the id
  // send an error message if the id is invalid

  const { id } = req.params;

  db.findById(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res
          .status(404)
          .json({ err: "The user with the specified ID does not exist" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The user information could not be retrieved." });
    });
});

server.post("/api/users", (req, res) => {
  // creates a new user with a unique ID in the database
  // insert a user with a unique ID into the database
  // else send an error message that says Please provide name and bio for the user with a 400 request if the bio or name is missing
  const user = req.body;
  if (user.name && user.bio) {
    db.insert(user)
      .then(idInfo => {
        db.findById(idInfo.id).then(user => {
          res.status(201).json(user); //201 signifies something has been created in a database
        }); //no .catch for 2nd db, because the catch should catch everything
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the user to the database"
        });
      });
  } else {
    res.status(400).json({ err: "Please provide name and bio for the user." });
  }
});

server.delete("/api/users/:id", (req, res) => {
  // deletes a user by a specified ID from the database

  const { id } = req.params;
  db.remove(id)
    .then(count => {
      if (count) {
        res.json({ message: "Successfully deleted" });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ err: "The user could not be removed" });
    });
});

server.put("/api/users/:id", (req, res) => {
  // updates any information for the user with the specified ID
  // check if ID is valid within the database
  // if ID is valid perform an update on the information that you enter
  // else send back a 404 error with the message The user with the specified ID does not exist
  // if there is an error updating the user send a 400 error with the message Please provide name and bio for the user
});

// should be last in the codebase
server.listen(PORT, () => {
  console.log(`Our Server is listenning on port ${PORT}`);
});
