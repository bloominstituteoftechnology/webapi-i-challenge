const express = require('express');
const server = express();
const db = require('./data/db')
const helmet = require('helmet');

// Middleware
server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send('the homies gotchu. go do /api/users.')
    .catch(err => res.status.apply(500).json({ error: 'the homies no gotchu'}))
});

server.post('/api/users', (req, res) => {
  const userInformation = req.body;
  console.log(userInformation);
  db.insert(userInformation)
    .then(response => {
      if (errno === 19) {
        res.status(400).json({ error: "Please provide BOTH name and bio for the user."})
      } else {
        res.status(201).json(response);
      }
    })
    .catch(err => res.status(500).json({ error: `There was an error while saving the user to the database\nError Message: ${err}` }));
});


server.get('/api/users', (req, res) => {
  db.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ error: "The users' information could not be retrieved" }));
});

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(user => {
      if (user.length <= 0) {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
      } else {
        res.json(user);
      }
    })
    .catch(err => res.status(500).json({ message: "The user's information could not be retrieved" }));
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(count => {
      if (count === 1) {
        res.json({ message: "User successfully deleted." });
      } else if ( count === 0) {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(500).json({ message: "Serious Database Error. Contact administrator."});
      }
    })
    .catch(err => res.status(500).json({ error: "The user could not be removed" }));
})



server.listen(5000, () => console.log('\n=== API is running ==='));