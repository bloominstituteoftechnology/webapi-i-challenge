const express = require('express');
const db = require('./data/db');

const server =  express();

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.use(express.json);

server.get('/users', (req, res) => {
  db.find()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(() => {
    res.status(500).json({ error: 'Users could not be retrieved.'});
  });
});

server.get('/users/:id', (req, res) => {
  const {id} = req.params;
  db.findByID(id)
    .then(response => {
      if (response.length < 1) {
        res.status(404).json({ error: 'the user with the given ID was not found' })
      }
      else {
        res.json(response);
      }
    })
    .catch(() => {
        res.status(500).json({error: 'Specified user\(s\) not found'});
    })
});

server.post('users/:id')

server.listen(8000, () => console.log('API running on port 8000'));
