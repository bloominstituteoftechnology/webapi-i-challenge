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

server.get("/", (req, res) => {
  res.send("<h1>Hello World<h1>");
});

server.get("/hobbits", (req, res) => {
  const hobbits = [
    {
      id: 1,
      name: "Samwise Gamgee"
    },
    {
      id: 2,
      name: "Frodo Baggins"
    }
  ];
  res.status(200).json(hobbits);
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

server.listen(8000, () => console.log("API running..."));
