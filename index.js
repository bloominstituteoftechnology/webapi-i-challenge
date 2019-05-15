const express = require("express");
const db = require("./data/db.js");

const server = express();
const { users } = db;

server.use(express.json());

server.post("/api/users/", (req, res) => {
  const newUser = req.body;

  users
    .insert(newUser)
    .then(addedUser => {
      if (addedUser.name && addedUser.bio) {
        res.json(addedUser);
      } else {
        res
          .status(404)
          .json({ errorMessage: "Please provide name and bio for the user." });
      }
    })
    .catch(() => {
      res.status(404).json.send({
        errorMessage: "Please provide name and bio for the user."
      });
    });
});

server.get("/api/users", (req, res) => {
  users
    .find()
    .then(users => {
      res.json(users);
    })
    .catch(() => {
      res
        .status(500)
        .json.send({ err: "The users information could not be retrieved." });
    });
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
