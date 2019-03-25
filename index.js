// implement your API here

//this is how you import in express
const express = require("express");
const db = require("./data/db");

const server = express();
server.use(express.json());

//http is protocol that connects client and server
//send is a node function while get is http
server.get("/", (req, res) => {
  res.send("Hello World");
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res
          .status(404)
          .json({ message: "The users information could not be retrieved." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

server.get("/api/users/:id", (req, res) => {
  const id = req.param.id;
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
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

server.post("/api/users", (req, res) => {
  const user = req.body;

  db.insert(user)
    .then(user => {
      if (user.name && user.name) {
        res.status(201).json({ success: true, user });
      } else {
        res
          .status(400)
          .json({ error: "Please provide name and bio for the user." });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({
        success: false,
        message
      });
    });
});

server.listen(8000, () => console.log("API running on port 8000"));
