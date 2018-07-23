// import express from 'express'

const express = require("express"); // CommonJS
const helmet = require("helmet");

//import /data/db.js file into index.js
const users = require("./data/db");

const server = express();
//add middleware
server.use(helmet());

server.get("/", (req, res) => {
  res.send("<h1>Hello World<h1>");
});

server.get("/hobbits", (req, res) => {
  // route handler code here
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
    .findById(id)
    .then(user => {
      res.status(200).json(users);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

server.listen(8000, () => console.log("API running..."));
