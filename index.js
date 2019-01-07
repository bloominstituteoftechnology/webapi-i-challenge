const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');
const server = express();
const port = 5000;

// middleware
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const fetchUsers = (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error getting the users' });
    });
};

server.get('/users', fetchUsers);

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  db.find()
    .then(users => {
      const user = users.find(user => user.id == id);
      if (!user) res.status(404).json({ message: `The user with an id of ${id} could not be found.` });
      else res.status(200).json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'The user information could not be retrieved.' });
    });
});

server.post('/users', (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' }).end();
  }
  const user = { name, bio };
  db.insert(user)
    .then(id => {
      db.find(id)
        .then(user => res.status(201).json(user))
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'There was an error indexing and/or finding the user.' });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'There was an error while saving the user to the database.' });
    });
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      db.remove(id)
        .then(success => {
          if (success) {
            fetchUsers(req, res);
          }
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'The user could not be removed.' });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(404).json({ message: `The user with an id of ${id} does not exist.` });
    });
});

server.put('/users/:id', (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' }).end();
  }
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      db.update(id, { name, bio })
        .then(success => {
          if (success) {
            fetchUsers(req, res);
          }
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ message: 'The user information could not be modified.' });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(404).json({ message: `The user with an id of ${id} does not exist.` });
    });
});

server.listen(port, () => console.log(`Server listening on port ${port}.`));
