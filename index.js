const express = require("express");
const db = require("./data/db.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("It's alive!!!");
});

server.get("/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.json({ error: err, message: "Something broke" });
    });
});

server.post("/users", (req, res) => {
  const userInfo = req.body;
  console.log("request body: ", userInfo);
  db.insert(userInfo)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: err, message: "Error adding the user" });
    });
});

server.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  db.remove(userId)
    .then(deleted => {
      res.status(204).end();
    })
    .catch(err => {
      res.status(500).json({ error: err, message: "Error deleting the user" });
    });
});

server.listen(5300, () => {
  console.log("\n*** API running on port 5.3k ***\n");
});
