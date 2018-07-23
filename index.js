const express = require('express');
const db = require('./data/db');
const server = express();

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.get('/api/users', (req, res) => {
  db
    .find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    })
})

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db
  .findById(id)
  .then(users => {
    if (users.length == 1) {
      return res.status(200).json(users[0]);
    } else {
      return res.status(404).json({ message: 'user not found'});
    }
  })
  .catch(err => {
    res.status(500).json({ error: err });
  });
}  );


server.listen(8000, () => console.log('API running...'));