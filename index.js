const express = require('express');
const db = require('./data/db.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = express();

server.use(bodyParser.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send('Home page');
})

server.post('/api/users', (req, res) => {
  if (!req.body.name || !req.body.bio) {
    return res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
  }
  db.insert(req.body)
    .then(users => res.status(201).json(users))
    .catch(err => res.status(500).json({ error: "The users information could not be retrieved." }));
})

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err));
})

server.get('/api/users/:id', (req, res) => {
  db.findById(req.params.id)
    .then(user => {
      if (user.length === 0) {
        return res.status(404).json({ message: "The user with the specified ID does not exist." });
      }
      res.status(200).json(user)
    })
    .catch(err => res.status(500).json({ error: "The user information could not be retrieved." }));
})

server.delete('/api/users/:id', (req, res) => {
  db.remove(req.params.id)
    .then(user => {
      if (user.length === 0) {
        return res.status(404).json({ message: "The user with the specified ID does not exist." });
      }
      res.status(200).json(user)
    })
    .catch(err => res.status(500).json({ error: "The user could not be removed" }));
})

server.put('/api/users/:id', (req, res) => {
  if (!req.body.name || !req.body.bio) {
    return res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
  }
  db.update(req.params.id, req.body)
    .then(user => {
      if (user.length === 0) {
        return res.status(404).json({ message: "The user with the specified ID does not exist." });
      }
      res.status(200).json(user)
    })
    .catch(err => res.status(500).json({ error: "The user information could not be modified." }));
})

server.listen(8000, () => console.log('API running'));
