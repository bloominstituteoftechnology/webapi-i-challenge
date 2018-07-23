const express = require('express');
const db = require('./data/db.js');
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.get('/api/users', (req, res) => {
  return db.find()
  .then(users => res.status(200).json(users))
  .catch(() => res.status(500).send({ error: 'The users information could not be retrieved.' }))

});

server.get('/api/users/:id', (req, res) => {
  return db.findById(req.params.id)
  .then(user => {
    if (user.length === 0) {
      res.status(404).send({ error: 'The user with the specified ID does not exist.' })
    } else {
      res.status(200).json(user);
    }
  })
  .catch(error => res.status(500).send({ error: 'The user information could not be retrieved.' }))

});

server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(400).send({ error: 'Please provide name and bio for the user.' })
  }

  return db.insert(req.body)
  .then(user => {
    return db.findById(user.id)
    .then(newUser => res.status(201).json(newUser))
  })
  .catch(error => res.status(500).send({ error: 'There was an error while saving the user to the database.' }))

});

server.delete('/api/users/:id', (req, res) => {
  let foundUser = null, id = req.params.id;
  return db.findById(id)
  .then(user => {
    if (user.length === 0) {
      res.status(404).send({ error: 'The user with the specified ID does not exist.' })
    } else {
      foundUser = user;
      return db.remove(id)
      .then(() => res.status(200).json(foundUser))
    }
  })
  .catch(error => res.status(500).send({ error: 'The user could not be removed.' }))

});

server.listen(8000, () => console.log('API running on port 8000'));