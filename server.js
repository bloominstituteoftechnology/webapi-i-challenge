const express = require('express');
const db = require('./data/db');

const server = express();
const port = 5555;

// Extend server to use JSON
server.use(express.json());

server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;

  if (name === undefined || bio === undefined) {
    res.status(400).json({ error: 'Please provide name and bio for the user.' });
  } else {
    db
      .insert({ name, bio })
      .then(userId => {
        db
          .findById(userId.id)
          .then(user => {
            res.status(201).json(user);
          })
          .catch(error => {
            res.status(500).json({ error });
          });
      })
      .catch(error => {
        res.status(500).json({ error: 'There was an error while saving the user to the database.' });
      });
  }
});

server.listen(port, () => console.log(`Server running on port ${port}`));