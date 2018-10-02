// implement your API here
// introduce how routing works

// import express from 'express'; // ES2015 modules > export default someCode;
const express = require('express'); // CommonJS modules > module.exports = someCode;
const cors = require('cors'); // install this package to connect from react

const db = require('./data/db.js');

const server = express(); // creates the server

server.use(cors()); // this neeeded to connect from react

server.use(express.json()); // formatting our req.body obj.

server.get('/', (req, res) => {
  //< ---- Route Handler ^^^
  // request/route handler
  res.send('<h1>Hello FSW13!</h1>');
});

server.get('/api/about', (req, res) => {
  res.status(200).send('<h1>About Us</h1>');
});

server.get('/api/contact', (req, res) => {
  res
    .status(200)
    .send('<div><h1>Contact</h1><input placeholder="email" /></div>');
});

// #################### USERS #######################

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;
  const newUser = { name, bio };
  db.insert(newUser)
    .then(userId => {
      const { id } = userId;
      db.findById(id).then(user => {
        console.log(user);
        if (!user) {
          return res
            .status(422)
            .send({ Error: `User does not exist by that id ${id}` });
        }
        res.status(201).json(user);
      });
    })
    .catch(err => console.error(err));
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(removedUser => {
      console.log(removedUser);
      res.status(200).json(removedUser);
    })
    .catch(err => console.error(err));
});

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  // ALWAYS CHECK YOUR UPDATES AND RESPOND ACCORDINGLY, THIS ENDPOINT ISNT FINISHED
  const newUser = { name, bio };
  console.log(newUser);
  db.update(id, newUser)
    .then(user => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch(err => console.error(err));
});

 const port = 9000;
 server.listen(port, () => 
  console.log(`\n=== API running on ${port} ===\n`)
 );