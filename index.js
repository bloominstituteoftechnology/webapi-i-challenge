// implement your API here
const express = require('express');
const db = require('./data/db');
const server = express();
server.use(express.json());

// Delivers 'server running' response:
server.get('/', (req, res) => {
  res.send('Server running...');
});

// Fetches users array:
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
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved.' });
    });
});

// Fetches a user:
server.get('/api/users/:id', (req, res) => {
  const user = req.params.id;
  db.findById(user)
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
        .json({ error: 'The user information could not be retrieved.' });
    });
});

// Adds a user:
server.post('/api/users', (req, res) => {
  const user = req.body;

  // I can't figure out the syntax to check user.name and user.bio inside the conditonal below, but defining them here works:
  const name = req.body.name;
  const bio = req.body.bio;

  db.insert(user)
    .then(user => {
      if (name && bio) {
        res.status(201).json(user);
      } else {
        res
          .status(400)
          .json({ errorMessage: 'Please provide name and bio for the user.' });
      }
    })
    // .then(user => {
    //   res.status(201).json(user);
    // })
    .catch(err => {
      res.status(500).json({ message: 'error adding user' });
    });
});

// Deletes a user:
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(user => {
      if (user) {
        // Sends general 'success' code, then ends the transmission (I forgot the proper name) since there is no need to send any other information.
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'error deleting user' });
    });
});

server.listen(4000, () => {
  console.log('\n** API up and running on port 4000 **');
});
