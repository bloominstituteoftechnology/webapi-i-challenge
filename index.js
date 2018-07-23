const express = require('express');
const server = express();
const db = require('./data/db.js')


server.get('/api/users', (req, res) => {
  db.find()
  .then(users => {
            res.send({ users });
        })
  .catch(error => {
    res.status(500).send({ error: "The users information could not be retrieved." })
  })
});



server.post("/api/users", (req, res) => {

  if (req.query.name == "" || req.query.bio == ""){
  res.status(400).send({ errorMessage: "Please provide name and bio for the user."});
        }
});

server.listen(8000, () => console.log('API running on port 8000'));
