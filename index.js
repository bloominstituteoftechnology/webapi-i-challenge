const express = require('express');


const db = require('./data/db.js');

const server = express();

server.use(express.json())


server.get('/api/users', (req, res) => {
  db.find()
  .then(allUsers => {
    res.json(allUsers);
  }).catch(err => {
    res.status(500).send(err);
  })
})

  server.get('/api/users/:id', (req, res) => {
   const { id } = req.params;

   db.findById(id)
   .then(userId => {
     res.json(userId);
   })
   .catch(err => {
     res.status(500).send(err);
   })
})


server.post('/api/users', (req, res) => {
  const newUser = req.body

  db.insert(newUser)
  .then(addedUser => {
    res.status(201).json(addedUser)
  })
  .catch(err => {
    res.status(500).send(err);
  })
})
/*
server.put('/api/users/:id', (req, res) => {

})
*/
server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
  .then(removedUser => {
    res.json(removedUser);
  })
  .catch(err => {
    res.status(400).send(err);
  })
})

server.listen(5000, () => {
  console.log(`Listening on port 5000`)
})
