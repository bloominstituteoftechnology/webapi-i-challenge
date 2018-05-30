const express = require('express');
const cors = require('cors');
const db = require('./data/db');

const server = express();
const port = 5000;

server.use(cors({ origin: 'http://localhost:3000' }));
server.use(express.json()); // will return the servers response as JSON

/*************************
** route `/` **
*************************/
// get
server.get('/', (req, res) => {
  res.send('Hello from express');
});

/*************************
** route `/api/users` **
*************************/
// get
server.get('/api/users', (req, res) => {
  return db.find()
    .then(users => res.status(200).json({ users }))
    .catch(err => res.status(500).json(err));
})

// post
server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    return res.status(400)
      .json({ "errorMessage": "Please provide name and bio for the user." });
  }
    return db.insert({ name, bio })
      .then(data => res.status(201).json(data))
      .catch(err => res.json(err));
});

/*************************
** route `/api/users/:id **
*************************/
// get
server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  return db.findById(id)
    .then(data => {
      if (data.length === 0) {
        return res.status(404).json({ "message": "The user with the specified ID does not exist." });
      }
      return res.status(200).json(data);
    })
    .catch(err => res.status(500).json({ "error": "The user information could not be retrieved." }));
});

// delete
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  return db.remove(id)
    .then(data => {
      if (data.length === 0) {
        return res.status(404).json({ "message": "The user with the specified ID does not exist." });
      }
      return res.status(200).json(data);
    })
    .catch(err => res.status(500).json({ "error": "The user could not be removed" }));
});

// put
server.put('/api/users/:id', (req, res) => {
  const { name, bio } = req.body;
  const id            = req.params.id;
  const user          = { name, bio };
  return db.update(id, user)
    .then(data => {
      if (!data) {
        return res.status(404).json({ "message": "The user with the specified ID does not exist." });
      }
      if (req.body.name === undefined || req.body.bio === undefined) {
        return res.status(400).json({ "errorMessage": "Please provide name and bio for the user." });
      }
      return db.findById(id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json({ "error": "Error" }));
});

server.listen(port, () => console.log(`Server running on port ${ port }`));