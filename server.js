const express = require('express');
const db = require('./data/db');

const server = express();
const port = 5000;

server.use(express.json()); // will return the servers response as JSON

// route `/`
server.get('/', (req, res) => {
  res.send('Hello from express');
});

// route `/api/users`
server.get('/api/users', (req, res) => {
  db.find().then(users => res.json({ users }));
})
server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;
  db.insert({ name, bio })
    .then(data => res.send(data))
    .catch(err => res.json(err));
})

// route `/api/users/:id
server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(data => res.json(data));
});

server.listen(port, () => console.log(`Server running on port ${ port }`));