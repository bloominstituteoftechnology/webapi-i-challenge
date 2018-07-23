const express = require('express');
const db = require('./data/db.js');
const server = express();

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.get('/api/users', (req, res) => {
  return db.find()
  .then(users => res.status(200).json(users))
  .catch(() => res.status(500).send({ error: 'The users information could not be retrieved.' }))
});

server.get('/api/users/:id', (req, res) => {
  return db.findById(req.params.id)
  .then(user => {
    if (user.length === 0) {
      res.status(404).send({ error: 'The user with the specified ID does not exist.' })
    } else {
      res.status(200).json(user);
    }
  })
  .catch(error => res.status(500).send({ error: 'The user information could not be retrieved.' }))
});

server.listen(8000, () => console.log('API running on port 8000'));