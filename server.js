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
        res.status(201);
        db.findById(response.id)
          .then(user => {
            res.json({ user });
          });
      })
      .catch(error => {
        res.status(500);
        res.json({ error: "There was an error while saving the user to the database" });
      });
  }
});


server.get('/api/users', (req, res) => {
  db.find().then(users => {
    res.json({ users });
  })
  .catch(error => {
    res.status(500);
    res.json({ error: "The users information could not be retrieved." });
  });
});

server.get('/api/users/:id', (req, res) => {
  db
    .findById(req.params.id)
    .then(users => {
      if (users.length > 0) {
        res.status(200);
        res.json({ users });
      }
      else {
        res.status(404);
        res.json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500);
      res.json({ error: "The user information could not be retrieved." });
    })
});


server.put('/api/users/:id', (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res.status(400);
    res.json({ errorMessage: "Please provide name and bio for the user." });
  }
  else {
    db
      .update(req.params.id, req.body)
      .then(success => {
        if (success) {
          res.status(200);
          db.findById(req.params.id)
            .then(user => {
              res.json({ user });
            });
        }
        else {
          res.status(404);
          res.json({ message: "The user with the specified ID does not exist." });
        }
      })
      .catch(error => {
        res.status(500);
        res.json({ error: "The user information could not be retrieved." });
      })
  }
});

server.delete('/api/users/:id', (req, res) => {
  db
    .remove(req.params.id)
    .then(success => {
      if (success) {
        res.status(200);
        res.json({ success });
      }
      else {
        res.status(404);
        res.json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500);
      res.json({ error: "The user could not be removed" });
    })
});



server.listen(port, () => console.log(`Server running on port ${port}`));
