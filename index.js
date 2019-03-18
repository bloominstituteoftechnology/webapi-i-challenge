// implement your API here
const express = require('express');
const db = require('./data/db');
const server = express();
server.use(express.json());

// Delivers 'server running' response:
server.get('/', (req, res) => {
  res.send('Server running...');
});

// Retrieves users array:
server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: 'no users to return' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'error retrieving users' });
    });
});

// Adds a user:
server.post('/api/users', (req, res) => {
  const user = req.body;
  db.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: 'error adding users' });
    });
});

server.listen(4000, () => {
  console.log('\n** API up and running on port 4000 **');
});
