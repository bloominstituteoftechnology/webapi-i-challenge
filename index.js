require("dotenv").config();
const cors = require("cors");

// implement your API here

// Import Express
const express = require("express");

// Import db
const db = require("./data/db.js");

// Initialize Express
const server = express();

// Middleware
server.use(express.json());
server.use(cors());

// CREATE
server.post("/api/users", (req, res) => {
  const { name, bio, created_at, updated_at } = req.body;
  if (!name || !bio) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  db.insert({ name, bio, created_at, updated_at })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

// READ
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      if (user.length === 0) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
      res.status(200).json(user);
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    });
});

// UPDATE
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  db.update(id, { name, bio })
    .then(user => {
      if (user === 0) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: "The user could not be modified" });
    });
});

// DESTROY
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
  db.remove(id)
    .then(user => {
      if (user === 0) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
      res.status(204).end();
    })
    .catch(err => {
      res.status(500).json({ error: "The user could not be removed" });
    });
});

const port = process.env.port || 5000;

// Run Server
server.listen(port, () => {
  console.log(`Server running.`);
});
