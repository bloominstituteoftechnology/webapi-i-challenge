// import express from 'express'

const express = require("express"); // CommonJS
const helmet = require("helmet");

//import /data/db.js file into index.js
const users = require("./data/db");

const server = express();
//add middleware
server.use(helmet());
//for postman
server.use(express.json());

let hobbits = [
  {
    id: 1,
    name: "Bilbo Baggins"
  },
  {
    id: 2,
    name: "Frodo Baggins"
  }
];
let nextId = 3;

server.get("/", (req, res) => {
  res.send("<h1>Hello World<h1>");
});

server.get("/hobbits", (req, res) => {
  res.status(200).json(hobbits);
});

server.post("/hobbits", (req, res) => {
  //   const hobbit = req.body;
  const hobbit = { id: nextId++, ...req.body };
  hobbits.push(hobbit);

  res.status(200).json(hobbits);
});

server.delete("/hobbits/:id", (req, res) => {
  //delete the hobbit, which hobbit?
  const { id } = req.params;

  hobbits = hobbits.filter(hobbit => hobbit.id != id);

  res.status(200).json(hobbits);
});

server.get("/hobbits", (req, res) => {
  const sortField = req.query.sortby || "id"; //!==sortBy
  const response = hobbits.sort((a, b) => {
    return a[sortField] < b[sortField] ? -1 : 1;
  });
  res.status(200).json(response);

  //localhost:8000/hobbits/sortby=id
});

server.put("/hobbits/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  //update hobbit
});

server.get("/users", (req, res) => {
  users
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

server.get("/users/:id", (req, res) => {
  users
    .findById(req.params.id)
    .then(user => {
      if (user.length === 0) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
      res.status(200).json(user);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

server.post("/users", (req, res) => {
  //   users.insert({ name: "", bio: "", created_at: date, updated_at: date });
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(400).json({ error: "Please provide name and bio for the user" });
  }
  users
    .insert({ name, bio })
    .then(users => res.status(201).json(users))
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    });
});

server.delete("/users/:id", (req, res) => {
  //remove: the remove method accepts an id as it's first parameter
  //and upon successfully deleting the user from the database
  //it returns the number of records deleted.
  //delete = index => h=> [...h.slice(0, index),...h.slice(index+1)]
  const { id } = req.params;
  users
    .remove(id)
    .then(users => {
      if (users === 0) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exists." });
      }
      res.status(201).json(users);
    })
    .catch(error => {
      res.status(500).json({ error: "The user could not be removed" });
    });
});

server
  .put("users/:id", (req, res) => {
    const id = req.params.id;
    const { name, bio } = req.body;
    if (!name || !bio) {
      res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user" });
    }
    users
      .update(id, { name, bio })
      .then(users => {
        if (users.length == 0) {
          res
            .status(404)
            .json({
              message: "The user with the specified ID does not exist."
            });
        }
        res.status(200).json(user);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "The user information could not be modified" });
      });
  })
  .catch(error => {
    res
      .status(500)
      .json({ error: "The user information could not be modified" });
  });

server.listen(8000, () => console.log("API running..."));
