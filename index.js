// implement your API here
const express = require("express");
const db = require("./data/db");
const server = express();
const port = "9090";

server.use(express.json());

const userError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
};

server.get("/", (req, res) => res.send("Hello"));

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;

  db.insert({ name, bio })
    .then(response => res.send(response))
    .catch(err => {
      userError(400, "Please provide name and bio for the user.", res);
    });
});
server.get("/api/users", (req, res) => {
  db.find().then(users => {
    res.json({ users });
  });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => res.json(user))
    .catch(err => {
      userError(500, "Cannot find user", res);
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(response => res.json({ success: `User ${id} removed from system` }))
    .catch(err => {
      userError(500, "Could not remove user", res);
      return;
    });
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  if (!name || !bio) {
    userError(404, "Must provide name and bio", res);
    return;
  }
  db.update(id, { name, bio }).then(
    db
      .findById(id)
      .then(user => res.json(user))
      .catch(err => {
        userError(500, "Something bad happened", res);
      })
  );
});

server.listen(port, () => console.log(`I hear you ${port}`));
