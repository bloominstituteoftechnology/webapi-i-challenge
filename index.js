const express = require("express"); // 1. add express functionality
const db = require("./data/db.js"); //tells server where to find the database/data

const server = express(); // 2. create an express server call it server

server.use(express.json()); //teaches express how to parse json

const port = 4000;
server.listen(4000, () => {
  console.log("Server running on localhost: 4000");
});

//create home endpoint
server.get("/", (req, res) => {
  res.send("Hello World");
});

//handle post request to check if missing name or bio property
server.post("/api/users", (req, res) => {
  const user = req.body;

  db.insert(user)

    .then(user => res.status(201).json(user))

    .catch(() =>
      res.status(500).json({
        error: "Please provide name and bio for the user."
      })
    );
});

//get all users
server.get("/api/users", (req, res) => {
  db.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved" });
    });
});

//return user with the specified id
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id)

    .then(user =>
      user
        ? res.status(200).json(user)
        : res.status(404).json({
            message: "The user with the specified id does not exist."
          })
    )

    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved" });
    });
});

//remove user with the specified id
server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(user =>
      user
        ? res.status(200).json(user)
        : res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." })
    )

    .catch(err => {
      res.status(500).json({ error: "The user could not be removed." });
    });
});

//updates user with specified id
server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;

  const userUpdate = req.body;

  db.update(id, userUpdate)

    .then(user =>
      user
        ? res.status(200).json(user)
        : res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." })
    )

    .catch(() =>
      res
        .status(500)
        .json({ error: "The user information could not be modified." })
    );
});
