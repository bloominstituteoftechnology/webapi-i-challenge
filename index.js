const express = require('express');
const data = require('./data/db');

const server = express();

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.get('/hobbits', (req, res) => {
  const hobbits = [
    {
      id: 1,
      name: 'Samwise Gangee',
    },
    {
      id: 2,
      name: 'Frodo Baggins',
    }
  ];

  res.status(200).json(hobbits);
});


server.post('/api/users', (req, res) => {
  if (!req.name || !req.body) {
    res.status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
    return;
  } else {
    data.insert(req)
      .then(response => {
        res.status(201).json(response);
      })
      .catch(err =>{
        res.status(500)
          .json({ error: "There was an error while saving the user to the database" });
      });
  }
});

server.get('/api/users', (req,res) => {
  data.find()
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500)
      .json({ error: "The users information could not be retrieved." })
    );
});

server.get('/api/users/:id', (req, res) => {
  data.findById(req.params.id)
    .then(response => {
      if (!response) {
        res.status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(response);
      }
    })
    .catch(err => {
      res.status(500)
        .json({ error: "The user information could not be retrieved." });
    })
});

server.delete('/api/users/:id', (req, res) => {
  data.remove(req.params.id)
    .then(response => {
      if (!response) {
        res.status(404)
          .json({ message: "The user with the specified ID does not exist." });
        return;
      } 
    })
    .catch(response => {
      res.status(500)
        .json({ error: "The user could not be removed" });
    })
});

server.listen(8000, () => console.log('API running on port 8000'));
