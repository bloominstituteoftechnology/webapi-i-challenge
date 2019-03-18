// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('API is working')
})

// create a user
server.post(('/api/users', (req, res) => {
  const userInfo = req.body;
  console.log(`user info: `, userInfo);
  db.insert(userInfo)
    .then(user => {
      res.status(201).json(hub);
    }).catch(err => {
      res.status(500).json({ message: `error retrieving users` });
    });
}));

server.listen(4000, () => {
  console.log('\n**API up and running on port 4000 **');
});