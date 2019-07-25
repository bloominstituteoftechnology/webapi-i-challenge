const express = require('express');
const db = require('./data/db');

const server = express();

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

server.listen(8000, console.log('API running on port 8000'));
