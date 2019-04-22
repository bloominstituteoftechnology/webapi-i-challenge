// implement your API here
const express = require('express'); // import the express package

const db = require('./data/db.js'); // import data helpers

const port = 5000;  // specify the port to listen on

const server = express(); // creates the server

server.use(express.json()); // add this to make POST and PUT work

// handle request to the root of the api, the '/' route
server.get('/', (req, res) => {
  res.send('Howdy from Users API // by: x-zen');
});

/* ENDPOINTS */

// POST - Creates a user with info sent in request
server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;
  const newUser = req.body;

  if (!name || !bio) {
    res.status(400).json({ error: 'Please provide name and bio for the user' })
    return;
  }

  db
  .insert(newUser)
  .then(userID => {
    res.status(201).json(userID);
  })
  .catch(err => {
    res.status(500).json({ error: 'There was an error while saving the user to the database' })
  })
});

// GET - Returns array of all users in db
server.get('/api/users', (req, res) => {
  db
  .find()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(err => {
    res.status(500).json({ error: 'The users information could not be retrieved' });
  })
});

// GET - Returns user at the specified ID
server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db
  .findById(id)
  .then(user => {
    if (user === undefined) {
      res.status(404).json({ error: 'The user with the specified ID does not exist' })
      return;
    }
    res.status(200).json(user);
  })
  .catch(err => {
    res.status(500).json({ error: 'The user information could not be retrieved' })
  })
});

// DELETE - Removes user with specified ID & returns the deleted user
server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  db
  .remove(id)
  .then( deleted => {
    if (deleted === 0) {
      res.status(404).json({ error: 'The user with the specified ID does not exist' })
    }
    res.status(204).end()
  })
  .catch(err => {
    res.status(500).json({ error: 'The user could not be removed' })
  })
});

// PUT - Updates the user at the specified ID & returns the moded user
server.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const { name, bio } = req.body;
  const changes = req.body;

  if (!name || !bio) {
    res.status(400).json({ error: 'Please provide name and bio for the user' })
    return;
  }

  db
  .update(id, changes)
  .then(updated => {
    if (updated === 1) {
      res.status(200).json(updated)
    } else {
      res.status(404).json({ error: 'The user with the specified ID does not exist' })
    }
  })
  .catch(err => {
    res.status(500).json({ error: 'The user information could not be modified' })
  })
});


// watch for connections on specified port
server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
