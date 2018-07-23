const express = require('express');
const server = express();
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

server.listen(8000, () => console.log('API running on port 8000'));
