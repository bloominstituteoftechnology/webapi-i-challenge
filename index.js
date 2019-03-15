// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();
const port = 5000;

server.use(express.json());

server.get('/', (req, res) => {
  res.send('<h1>Hello World from NodeJS!</h1>');
});

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json({
        error: 'The users information could not be retrieved.',
      });
    });
});

// ------- NEED TO FIX POST-------------
// server.post('/api/users', (req, res) => {
//   const newUser = req.body;

//   if (newUser.name && newUser.bio) {
//     db.insert(newUser)
//       .then(newUser => {
//         res.status(201).json(newUser);
//       })
//       .catch(error => {
//         res.status(500).json({
//           error: 'There was an error while saving the user to the database',
//         });
//       });
//   } else {
//     res
//       .status(400)
//       .json({ errorMessage: 'Please provide name and bio for the user.' });
//   }
// });

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The user information could not be retrieved.' });
    });
});

server.listen(port, () => console.log(`Server is listening at port ${port}`));
