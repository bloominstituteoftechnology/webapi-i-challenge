// implement your API here

const express = require('express');
const server = express();

const Users = require('./data/db');

server.use(express.json());

server.get('/', (request, response) => {
  response.send('Hello from our new server!!!');
});

//POST

server.post('/api/users', (request, response) => {
  if (!request.body.name && !request.body.bio) {
    response.status(400).json({
      success: false,
      error: 'Please provide name and bio for the user.'
    });
  } else {
    Users.insert(newUser)
      .then(user => {
        response.status(201).json({ success: true, user });
      })
      .catch(err => {
        response.status(500).json({
          success: false,
          error: 'There was an error while saving the user to the database'
        });
      });
  }
});

//GET
server.get('/api/users', (request, response) => {
  Users.find()
    .then(users => {
      response.send(users);
    })
    .catch(err => {
      response.status(500).json({
        success: false,
        error: 'The users information could not be retrieved.'
      });
    });
});

server.get('/api/users/:id', (request, response) => {
  Users.findById(request.params.id)
    .then(user => {
      if (user) {
        response.status(200).json(user);
      } else {
        response.status(404).json({
          success: false,
          error: 'The user with the specified ID does not exist.'
        });
      }
    })
    .catch(() => {
      response.status(500).json({
        success: false,
        error: 'The user information could not be retrieved.'
      });
    });
});

//DELETE

server.delete('/api/users/:id', (request, response) => {
  Users.remove(request.params.id)
    .then(deleted => {
      if (deleted) {
        response.status(200).json({
          message: 'The user was deleted.'
        });
      } else {
        response.status(404).json({
          success: false,
          error: 'The user with the specified ID does not exist.'
        });
      }
    })
    .catch(err => {
      response
        .status(500)
        .json({ success: false, error: 'The user could not be removed' });
    });
});

//PUT

server.put('/api/users/:id', (request, response) => {
  if (!request.body.name && !request.body.bio) {
    response.status(400).json({
      success: false,
      error: 'Please provide name and bio for the user.'
    });
  } else {
    Users.update(request.params.id, request.body)
      .then(user => {
        if (user) {
          response.status(201).json({ success: true, user });
        } else {
          response.status(404).json({
            success: false,
            error: 'The user with the specified ID does not exist.'
          });
        }
      })
      .catch(err => {
        response.status(500).json({
          success: false,
          error: 'There was an error while saving the user to the database'
        });
      });
  }
});

server.listen(4000, () => {
  console.log('Server listening on port 4000.');
});
