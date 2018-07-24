const data = require("./data/db");
const bodyParser = require("body-parser");
const express = require("express");

const server = express();
server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.send("Hello Worldd");
});

server.get("/api/users", (req, res) => {
  data
    .find()
    .then(response => res.status(200).json(response))
    .catch(err =>
      res.status(500).json({
        error: "The users information could not be retrieved"
      })
    );
});

// Adding users

server.post("/api/users", (req, res) => {
  const name = req.body.name;
  const bio = req.body.bio;
  const user = { name, bio };
  // if we don't have any name or bio:
  if (!name || !bio) {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user"
    });
  } else {
    data.insert(user).then(response =>
      data
        .findById(response.id)
        .then(response => res.status(200).json(response))
        .catch(err =>
          res.status(500).json({
            errorMessage: "The users information could not be retrieved"
          })
        )
    );
  }
});

// Getting individual users
server.get("/api/users/:id", (req, res) => {
  data
    .findById(req.params.id)
    .then(response => {
      if (response.length !== 0) {
        return res.status(200).json(response);
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(err =>
      res.status(500).json({
        error: "The users information could not be retrieved"
      })
    );
});

// Deleting users
server.delete("/api/users/:id", (req, res) => {
  data
    .findById(req.params.id)
    .then(response => {
      if (response.length === 0) {
        return res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      } else {
        return res.status(200).json({ response });
      }
      data.remove(req.params.id);
    })
    .catch(err =>
      res.status(500).json({ error: "The user could not be removed" })
    );
});

server.listen(8000, () => console.log("API is running on port 8000"));
