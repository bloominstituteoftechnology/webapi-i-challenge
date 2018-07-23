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
    res.json({ users });
  })
  .catch(error => {
    res.status(500).json({ error: "Could not retrieve user's information" })
  })
});

server.post('/api/users', (req, res) => {
  if(!name || !bio) {

  }
});

server.listen(8000, () => console.log('API running on port 8000'));
