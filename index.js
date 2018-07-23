const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data/db');

const server = express();
// turn on the body parser, using JSON data
server.use(bodyParser.json());
const PORT = 8000;

server.get('/api/users', (req, res) => {
  data
    .find()
    .then(response => res.status(200).json(response))
    .catch(err => console.log('ERROR', err));
});

server.post('/api/users', (req, res) => {
  const user = req.body.user;
  if (!user) {
    res.status(422).json({ error: 'must supply a user' });
  }
});

server.listen(PORT, console.log(`Server listening on port ${PORT}`));
