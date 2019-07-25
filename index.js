// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json()); // <<<<<<<< to parse JSON in POST

server.get('/', (req, res) => {
  res.send('Hello Universe!');
});

// GET /users
server.get('/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

const port = process.env.PORT || 9090;
server.listen(port, () => {
  console.log(`\n*** running on port ${port} ***\n`);
});
