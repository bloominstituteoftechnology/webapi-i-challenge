const express = require('express'); // CommonJS Modules
const cors = require('cors');
// the same as import express from 'express'; // ES2015 Modules

const db = require('./data/db');

const server = express();
const port = 4000;

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send('api: /now, /users');
});

// write a GET /now endpoint that returns current date and time as a string
server.get('/now', (req, res) => {
  const now = new Date().toISOString();
  res.send(now);
});

// the R in CRUD
server.get('/hubs', (req, res) => {
  db.find()
    .then(hubs => {
      // 2XX success
      // 3XX redirect
      // 4XX client error
      // 5XX server error
      res.status(200).json(hubs);
    })
    .catch(error => {
      // handle it
      res.status(500).json({ message: 'error retrieving hubs' });
    });
});

// the C in CRUD
server.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name && newUser.bio) {
    db.insert(newUser)
      .then(newUser => {
        res.status(201).json(newUser);
      })
      .catch(error => {
        res.status(500).json({
          error: 'There was an error while saving the user to the database',
        });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  }
});

// the R in CRUD
server.get('/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({
        error: 'The users information could not be retrieved.',
      });
    });
});

// the R in CRUD
server.get('/users/:id', (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: 'Specified ID does not exist.' });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The user information could not be retrieved.' });
    });
});

// the D in CRUD
server.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: 'Specified ID does not exist.' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'The user could not be removed' });
    });
});

// the U in CRUD
server.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  if (updatedUser.name && updatedUser.bio) {
    db.update(id, updatedUser)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({
            message: 'Specified ID does not exist.',
          });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: 'The user information could not be modified.' });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  }
});

server.listen(port, () => console.log(`Server is listening on port ${port}`));