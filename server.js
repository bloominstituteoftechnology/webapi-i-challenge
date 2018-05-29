const express = require('express');
const db = require('./data/db');

const server = express();
const port = 5000;

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
  db.find()
    .then(users => res.json({ users }))
    .catch(err => res.status(500).json(err));
})

// post
server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(400)
      .json({ "errorMessage": "Please provide name and bio for the user." })
      .end();
  }
  else {
    db.insert({ name, bio })
      .then(data => res.status(201).json(data))
      .catch(err => res.json(err));
  }
})

/*************************
** route `/api/users/:id **
*************************/
// get
server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(data => {
      if (data.length === 0) {
        return res.status(404).json({ "message": "The user with the specified ID does not exist." });
      }
      return res.status(200).json(data);
    })
    .catch(err => res.json(err));
});

// delete
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(data => res.json(data));
});

// put
server.put('/api/users/:id', (req, res) => {
  const { name, bio } = req.body;
  const id            = req.params.id;
  const user          = { name, bio };
  db.update(id, user)
    .then(data => res.json(data));
});

server.listen(port, () => console.log(`Server running on port ${ port }`));