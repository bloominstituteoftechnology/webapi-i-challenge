// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('API is working')
})

// create a user
server.post('/api/users', (req, res) => {
  const userInfo = req.body;
  console.log(`user info: `, userInfo);
  db.insert(userInfo)
    .then(user => {
      res.status(201).json(user);
    }).catch(err => {
      res.status(500).json({ message: `error retrieving users` });
    });
});

// get all users
server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: 'error retrieving users' });
    });
});

// get user by id
server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: 'error retrieving users' });
    });
});

// update user
server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: 'user not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'error retrieving users' });
    });
});

// delete user
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(deleted => {
      res.status(204).end();
    })
    .catch(err => {
      res.status(500).json({ message: 'error retrieving users' });
    });
});

server.listen(4000, () => {
  console.log('\n**API up and running on port 4000 **');
});