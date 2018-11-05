// implement your API here
// how to import/export code between files -- the Node way
// introduce how routing works
const express = require("express");
const cors = require('cors')


const db = require("./data/db");

const server = express(); //creates the server

server.use(cors()) // needed to connect from React
server.use(express.json())
server.get("/", (req, res) => {
  //request/route handler
  res.send("hello");
});

server.get('/api/contact', (req, res) => {
  res.status(200).send('<div><h1>Contact</h1><input placeholder="email"/></div>')
})

server.post('/api/users', (req, res) => {
  const { name, bio} = req.body;
  const newUser = { name, bio };
  db.insert(newUser)
  .then(userId => {
    const { id } = userId
    if (!user) {
      return res.status(422).send({Error: `User does not exist by that id ${id}`})
    }
    db.findById(id)
    .then(user => {
      res.status(201).json(user)
    })
  })
  .catch(err => console.log(err))
})

server.delete(`/api/users/:id`, (req, res) => {
  const { id } = req.params;
  db.remove(id)
  .then(removedUser => {
    res.status(200).json(removedUser)
  })
  .catch(err => console.error(err))
})

server.get("/api/users", (req, res) => { // cb is Route Handler
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
