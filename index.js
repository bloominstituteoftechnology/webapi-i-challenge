const express = require('express');
const db = require('./data/db');
const server = express();
server.use(express.json());

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
    console.log('users', users);
    if (users.length == 1) {
      return res.status(200).json(users[0]);
    } else {
      return res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
  })
  .catch(err => {
    res.status(500).json({ error: "The user information could not be retrieved." });
  });
});

server.post('/api/users', (req, res) => {
  console.log('req.body', req.body);
  const { name, bio } = req.body;
  if (!name || !bio) {
    return res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    }) 
  }
  db
    .insert({ name, bio })
    .then((newUserId)=> {
      console.log('newUser', newUserId);
      res.status(201).json({
        message: `${name} with id of ${newUserId.id} was added`
      })
    })
    .catch(error => {
      res.json(error);
    })
})

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db
    .remove(id)
    .then(response => {
      console.log('delete response', response)
      if (response !== id) {
        return res.status(404).json(
          { message: "The user with the specified ID does not exist." }
        )
      } else {
        return res.status(200).json({
          success: "The user was removed from the database"
        })
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The user could not be removed"
      })
    })
})

// ! needs work 
server.put('/api/users/:id', (req, res) => {
  const { bio, name } = req.params;
  if (!name || !bio) {
    return res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    }) 
  }

  db
    .update(id, { name, bio })
    .then(response => {
      res.status(200).json({
        message: response
      })
    })
    .catch(err => {
      return res.status(500).json({
        error: "The user information could not be modified"
      })
    })
})

server.listen(8000, () => console.log('API running...'));