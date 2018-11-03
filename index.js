// implement your API here
// how to import/export code between files -- the Node way
// introduce how routing works
const express = require("express");
const cors = require('cors')


const db = require("./data/db");

const server = express(); //creates the server

server.use(cors()) // needed to connect from React

server.get("/", (req, res) => {
  //request/route handler
  res.send("hello");
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

// watch for traffic in a particular port
const port = 9000;
server.listen(port, () => console.log(`=API running on ${port}=`));
// script and yarn server
