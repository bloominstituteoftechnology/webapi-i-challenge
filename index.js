const express = require("express");
const server = express();
const db = require("./data/db.js")


server.get("/api/users", (req, res) => {
  db.find()
  .then(users => {
            res.send({ users });
        })
  .catch(error => {
    res.status(500).send({ error: "The users information could not be retrieved." })
  })
});

server.get("/api/users/:id", (req, res) => {
  let user = req.params;
  db.findById(user.id)
  .then(user => {
    if (user == ""){
      res.status(404).send({ message: "The user with the specified ID does not exist." })
    }
    res.send({ user });
  })
  .catch(error => {
    res.status(404).send({ message: "The user with the specified ID does not exist." })
  })
})
//kinda redundant ^


server.post("/api/users", (req, res) => {
  if (req.query.name == "" || req.query.bio == ""){
  res.status(400).send({ errorMessage: "Please provide name and bio for the user."});
        }
  else {
    db.insert({
      name: req.query.name,
      bio: req.query.bio
    })
    .then(response => res.status(201).send(response))
    .catch(error => {
      res.status(500).send({ error: "There was an error while saving the user to the database" });
    })
  }
});

server.listen(8000, () => console.log('API running on port 8000'));
