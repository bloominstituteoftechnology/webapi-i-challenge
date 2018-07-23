const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data/db');

const server = express();
// turn on the body parser, using JSON data
server.use(bodyParser.json());
const PORT = 8000;

// get all users from database
server.get('/api/users', (req, res) => {
  data
    .find()
    .then(response => res.status(200).json(response))
    .catch(err =>
      res.json({ error: 'The users information could not be retrieved.' }),
    );
});

// add a new user
server.post('/api/users', (req, res) => {
  const name = req.body.name;
  const bio = req.body.bio;

  // we have the data we need?
  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
    return;
  }

  // build the user
  const user = {
    name,
    bio,
  };

  // put user into the database
  data
    .insert(user)
    .then(response =>
      // response is the new user's id
      data
        .findById(response.id) // get the new user
        .then(response => res.status(200).json(response)) // response is the user
        .catch(() => {
          res
            .status(500)
            .json({ error: 'The user information could not be retrieved.' });
          return;
        }),
    )
    .catch(err =>
      res.status(500).json({
        error: 'There was an error while saving the user to the database',
      }),
    );
});

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;

  data
    .findById(id)
    .then(response => {
      if (response.length !== 0) {
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(() =>
      res
        .status(500)
        .json({ error: 'The user information could not be retrieved.' }),
    );
});

server.listen(PORT, console.log(`Server listening on port ${PORT}`));
