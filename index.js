const express = require('express'); //builds server on node
const server = express();
const db = require('./data/db.js');

server.use(express.json()); // use this if you're sending back json

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.get('/hobbits', (req, res) => {
  const hobbits = [
    {
      id: 1,
      name: 'Samwise Gamgee'
    },
    {
      id: 2,
      name: 'Frodo Baggins'
    }
  ];
  res.status(200).json(hobbits);
});

server.get('/users', (req, res) => {
  db.find()
    .then((users) => {
      res.json(users); // can use .send instead of .json
    })
    .catch(() => {
      res.status(500).json({ error: 'users not found' });
    });
});

server.get('/users/:id', (req, res) => {
  // pull in the id from req.params
  // need to use the db method provided
  // .then (promise)
  // inside of our .then we could build some logic to check what is returned
  // if id does not exist then we will get an empty array
  // else we will json the user back to the client
  // .catch for error
  const { id } = req.params;
  // const id = req.params.id;
  db.findById(id)
    .then((response) => {
      if (response.length < 1) {
        //response.length === 0
        // if it doesn't exits
        res.status(404).json({ message: 'The user with the specified ID does not exist.' });
      } else {
        res.json(response); // send response if it exists
      }
    })
    .catch(() => {
      // server error
      res.status(500).json({ error: 'users not found' });
    });
});

server.post('/users', (req, res) => {
  const user = req.body;
  if (!user.name || !user.bio) {
    res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
  }
  db.insert(user)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(() => {
      res.status(500).json({ error: 'There was an error while saving the user to the database' });
    });
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params; // id is key on the object

  db.remove(id)
    .then((response) => {
      if (response === 0) {
        res.status(404).json({ message: 'The user with the specified ID does not exist.' });
      } else {
        res.json(response);
      }
    })
    .catch(() => {
      res.status(500).json({ error: 'The user could not be removed' });
    });
});

server.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;
  if (!user.name || !user.bio) {
    res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
  }
  db.findById(id)
    .then((response) => {
      if (response.length < 1) {
        res.status(404).json({ message: 'The user with the specified ID does not exist.' });
      } else {
        db.update(id, user).then((user) => {
          res.status(201).json(user);
        });
      }
    })
    .catch(() => {
      res.status(500).json({ error: 'The user information could not be modified.' });
    });
});

server.listen(8000, () => console.log('API running on port 8000'));
