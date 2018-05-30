const express = require('express');
const db = require('./data/db');

const port = 5555;
const server = express();
server.use(express.json());

server.get('/api/users', (req, res) => {
  db
    .find()
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.json(error)
    });
});

server.post('/api/users', (req, res) => { 
  const { name, bio } = req.body;
  if (name && bio) {
    db
      .insert({ name, bio })
      .then(response => {
        res.status(201).json({
          id: response.id,
          name,
          bio,
        });
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the user to the database",
        });
      });   
  } else {
    res.status(400).json({
      error: "Please provide name and bio for the user."
    })
  }
  
});

server.get('/api/users/:id', (req, res) => { 
  console.log('req.params', req.params.id);
  db
    .findById(req.params.id)
    .then(response => {
      if (response.length === 0) {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        })
      }
      
    })
    .catch(error => {
      res.json(error);
    });
});

server.listen(port, () => console.log(`server runnering on port ${port}`));

