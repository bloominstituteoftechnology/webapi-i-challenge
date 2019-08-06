// implement your API here
const express = require("express");
const db = require("./data/db.js");

const server = express();
server.use(express.json());

// test run
server.get("/", (req, res) => {
  res.send("testing");
});

// POST /api/users
server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  // const changes = req.body
  // if (!changes.name || !changes.bio)

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }

  db.insert({ name, bio })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the user to the database."
      });
    });
});

// GET /api/users
server.get("/api/users", (req, res) => {
  db.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user's information could not be retrieved." });
    });
});

// GET /api/users/:id
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);

  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

// DELETE /api/users/:id
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The user could not be removed." });
    });
});

// PUT /api/users/:id
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  let changes = { name, bio };
  // const changes = req.body
  // if (!changes.name || !changes.bio)

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }

  db.update(id, changes).then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  });
});

const port = 1000;
server.listen(port, () => console.log(`listening on port ${port}`));
