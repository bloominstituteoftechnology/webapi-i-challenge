const express = require("express");
const db = require("./data/db.js");

const server = express();
const { users } = db;

server.use(express.json());

server.post("/api/users/", (req, res) => {
  const newUser = req.body;

  users;
  db.insert(newUser).then(newUser => {
    if (newUser.name && newUser.bio) {
      res.status(201).json(newUser);
    } else {
      res
        .status(404)
        .json({ errorMessage: "Please provide name and bio for the user." });
    }
  });
});

server.get("/api/users", (req, res) => {
  users;
  db.find()
    .then(users => {
      res.json(users);
    })
    .catch(() => {
      res
        .status(500)
        .json.send({ err: "The users information could not be retrieved." });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  users;
  db.findById(id)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(404).json({ err: "User with specified ID does not exist" });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  users;
  db.remove(id)
    .then(removedUser => {
      res.json(removedUser);
    })
    .catch(() => {
      res.json({ err: "Could not find user" });
    });
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;

  users;
  db.update(id, { name, bio })
    .then(updatedUser => {
      res.json(updatedUser);
    })
    .catch(err => {
      res.status(500).json({ error: "User with specified ID does not exist." });
    });
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
