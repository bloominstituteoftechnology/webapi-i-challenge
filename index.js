const express = require('express');
const db = require('./data/db.js');
const server = express();
const PORT = '4000';

server.use(express.json());

// CREATE USER
server.post('/api/users', (req, res) => {
  const user = req.body;
  db
    .insert(user)
    .then(user => res.status(201).json(user))
    .catch(() => res.status(500).json({error: "There was an error while saving the user to the database"}));
});

// GET USERS
server.get('/api/users', (req, res) => {
  db
    .find()
    .then(users => res.json(users))
    .catch(() => res.status(code).json({error: "The users information could not be retrieved."}));
});

// GET USERS by ID
server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db
    .findById(id)
    .then(user => user ? res.json(user) : res.status(404).json({message: "The user with the specified ID does not exist."}))
    .catch(() => res.status(500).json({error: "The user information could not be retrieved."}));
});

// DELETE USER
server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db
    .remove(id)
    .then(user => user ? res.json(user) : res.status(404).json({message: "The user with the specified ID does not exist."}))
    .catch(() => res.status(500).json({error: "The user could not be removed"}));
});

// UPDATE USER
server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const updateUser = req.body;
  db
    .update(id, updateUser)
    .then(user => user ? res.json(user) : res.status(404).json({message: "The user with the specified ID does not exist."}))
    .catch(() => res.status(500).json({error: "The user information could not be modified."}));
});

server.listen(PORT);