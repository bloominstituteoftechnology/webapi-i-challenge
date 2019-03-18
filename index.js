// implement your API here

const express = require('express');
const db = require('../webapi-i-challenge/data/db');

const server = express();

server.use(express.json());
// server.use(cors());

server.get('/', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.json(err);
    });
});
server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(id => {
      if (id) {
        res.status(200).json(id);
      } else {
        res.status(404).json({ message: 'user does not exist' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'The users informaton can not be retrived ' });
    });
});

server.post('/api/users', (req, res) => {
  console.log(req.body);

  db.insert(req.body)
    .then(insertedUser => {
      res.status(201).json({ 'New User Created': insertedUser });
    })
    .catch(err => {
      res.status(500).json({ message: 'The user info can not be retrived' });
    });
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'The users informaton can not be retrived ' });
    });
});

server.listen(5000, () => console.log('Server is running'));
