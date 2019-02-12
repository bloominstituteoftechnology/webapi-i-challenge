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
      res.status(errr.code).json({ success: false, message: err.message });
    });
});
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(users => {
      res.status(200).json({ success: true, users });
    })
    .catch(err => {
      res.status(err.code).json({ success: false, message: err.message });
    });
});
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.update(id, changes)
    .then(users => {
      res.status(200).json({ success: true, users });
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

server.listen(4000, () => {
  console.log("/n***Listening on port 4000***/n");
});
