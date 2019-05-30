const db = require("./data/db.js");
const cors = require("cors");
const { users } = db;

// implement your API here
// require the express npm module, needs to be added to the project using "yarn add" or "npm install"
const express = require("express");

// creates an express application using the express module
const server = express();
server.use(express.json());
server.use(cors());

// configures our server to execute a function for every GET request to "/"
// the second argument passed to the .get() method is the "Route Handler Function"
// the route handler function will run on every GET request to "/"

// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts

server.get("/api/", (req, res) => {
  res.send("Hello world from WEBAPI-I-CHALLENGE!");
});

// server.get("/api/hobbits", (req, res) => {
//   const hobbits = [
//     {
//       id: 1,
//       name: "Samwise Gamgee"
//     },
//     {
//       id: 2,
//       name: "Frodo Baggins"
//     }
//   ];

//   res.status(200).json(hobbits);

// });

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .send({ err: "The users information could not be retrieved." });
    });
});

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  console.log("req.body", req.body);

  if (!name || !bio) {
    res
      .status(400)
      .json({ error: "Please provide name and bio for the user." });
  } else {
    db.insert({ name, bio })
      .then(addedUser => {
        res.status(201).json({ addedUser });
      })
      .catch(err => {
        res
          .status(500)
          .send({
            error: "There was an error while saving the user to the database"
          });
      });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  console.log("req.body", req.body);

  db.remove(id)
    .then(removedUser => {
      if (removedUser) {
        res.status(204).end();
      } else {
        res.status(404).json({
          message: "cannot find user"
        });
      }
    })
    .catch(err => {
      res.status(500).send({ error: "The user could not be removed" });
    });
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json({
          user
        });
      } else {
        res.status(404).json({
          message: "Cannot find the user"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "The user information could not be retrieved."
      });
    });
});

server.put("/api/users/:id", (req, res) =>
{
  const id = req.params.id;
  const updates = req.body;

  db.update(id, updates)
    .then(updatedUser =>
      {
      if (updatedUser) {
        res.status(200).json({ updatedUser });
      } else
      {
        res
          .status(404)
          .json({ err: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ err: "The users information could not be added." });
    });
});


server.listen(9000, () => {
  console.log("\n* Server Running on http://localhost:9000 *\n");
});
