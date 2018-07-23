const express = require('express');
const db = require('./data/db.js');
const bodyParser = require('body-parser');
const server = express();
server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.send('Home page');
})

server.post('/api/users', (req, res) => {
  const { name, bio, created_at, updated_at } = req.body;
  if (!name || !bio) {
    return res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
  }
  db.insert({ name, bio, created_at, updated_at })
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: "The users information could not be retrieved." }));
})

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err));
})

server.get('/api/user/:id', (req, res) => {
  db.findById(req.params.id)
    .then(user => {
      if (user.length === 0) {
        return res.status(404).json({ message: "The user with the specified ID does not exist." });
      }
      res.status(200).json(user)
    })
    .catch(err => res.status(500).json({ error: "The user information could not be retrieved." }));
})

server.listen(8000, () => console.log('API running'));
