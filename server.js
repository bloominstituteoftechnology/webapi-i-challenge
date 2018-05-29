const express = require('express');
const db = require('./data/db');
const server = express();

const port = 5000;

server.get('/', (req, res) => {
  // 1st arg: route where a resource can be interacted with
  // 2nd arg: callback to deal with sending responses
  res.send('Hello from express');
});

server.post('/api/users', (req, res) => {
  const {
    name,
    bio
  } = req.body;
  db
    .insert({
      name,
      bio
    })
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      res.json(error);
    });
});

server.get('/api/users', (req, res) => {
  db
    .find()
    .then(users => {
      res.json({
        users
      });
    })
    .catch(error => {
      res.json({
        error
      });
    });
});

server.get('/api/users/:id', (req, res) => {
  // pull id off of req.params;
  // invoke proper db.method(id) passing it the id.
  // handle the promise like above
  const {
    id
  } = req.params;

  db
    .findById(id)
    .then(users => {
      res.json(users[0]);
    })

    .catch(error => {
      res.status(500).json(error);
    });
});

server.delete('/api/users/:id', (req, res) => {
  const {
    id
  } = req.params;
  let user;

  db
    .findById(id)
    .then(response => {
      user = { ...response[0]
      };

      db.remove(id)
        .then(response => {
          res.status(200).json(user);
        })
        .catch(error => {
          res.status(500).json(error);
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
})
server.listen(5000, () => console.log(`Server running on port ${port}`))