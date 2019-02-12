const express = require("express");

const db = require("./data/db");

const server = express();

server.use(express.json());

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json({ success: true, users });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "The users information could not be retrieved "
      });
    });
});
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json({ success: true, user });
      } else {
        res.status(400).json({
          success: false,
          message: "The user with the specified ID does not exist"
        });
      }
    })
    .catch(err => {
      res.status(err.code).json({ success: false, message: err.message });
    });
});
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json({ success: true, updated });
      } else {
        return Promise.reject({
          code: 404,
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(err.code).json({ success: false, message: err.message });
    });
});
server.post("/api/users", (req, res) => {
  const user = req.body;
  db.insert(user)
    .then(users => {
      res.status(201).json({ success: true, user });
    })
    .catch(err => {
      res.status(err.code).json({ success: false, message: err.message });
    });
});
server.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  db.remove(userId)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({
          success: false,
          message: "he user with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(err.code).json({ success: false, message: err.message });
    });
});

server.listen(4000, () => {
  console.log("/n***Listening on port 4000***/n");
});
