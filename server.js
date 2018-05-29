const express = require('express');
const db = require('./data/db.js');

const port = 5555;
const server = express();
server.use(express.json());



server.post('/api/users', (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res.status(400);
    res.json({ errorMessage: "Please provide name and bio for the user." });
  }
  else {
    db
      .insert(req.body)
      .then(response => {
        res.send(response);
      })
      .catch(error => {
        res.json(error);
      })
  }
});


server.get('/api/users', (req, res) => {
  db.find().then(users => {
    res.json({ users });
  })
    .catch(error => {
      res.json({ error });
    });
});

server.get('/api/users/:id', (req, res) => {
  db
    .findById(req.params.id)
    .then(users => {
      res.json({ users });
    })
    .catch(error => {
      res.json(error);
    })
});


server.put('/api/users/:id', (req, res) => {
  db
    .update(req.params.id, req.body)
    .then(success => {
      res.json({ success });
    })
    .catch(error => {
      res.json(error);
    })
});

server.delete('/api/users/:id', (req, res) => {
  db
    .remove(req.params.id)
    .then(success => {
      res.json({ success })
    })
    .catch(error => {
      res.json(error);
    })
});



server.listen(port, () => console.log(`Server running on port ${port}`));
