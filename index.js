const express = require('express');
const server = express();
server.use(express.json());
const db = require('./data/db');

server.get('/', (req, res) => {
  res.send('Homepage!');
});

server.get('/api/users', (req, res) => {
  db
  .find()
  .then(users => {
    res.status(200).json({ users });
  })
  .catch(error => {
    res.status(500).json({ error: "The users information could not be retrieved." })
  })
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db
  .findById(id)
  .then(user => {
    if(user.length > 0) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
  })
  .catch(error => {
    res.status(500).json({ error: "The user information could not be retrieved." })
  })
})

server.post('/api/users/', (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    return;
  }
  db
  .insert({ name, bio })
  .then(response => {
      res.status(201).json(response);
  })
  .catch(error => {
    res.status(500).json({ error: "There was an error while saving the user to the database" })
  })
})

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db
  .remove(id)
  .then(user => {
    if(!user) {
      res.status(404).json({ message: "The user with the specified ID does not exist."})
    } else {
      res.status(200).json({ user })
    }
  })
  .catch(error => {
    res.status(500).json({ error: "The user could not be removed" })
  })
})

server.listen(8000, () => console.log('API running on port 8000'));
