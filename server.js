const express = require('express');
const db = require('./data/db');

const port = 5555;
const server = express();
server.use(express.json());

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
  const id = req.params.id;
  db
    .findById(id)
    .then(response => {
      if (response.length === 0) {
        return res.status(404).json({ message: "The user with the specified ID does not exist." })
      }
      res.status(200).json(response)
    })
    .catch(error => {
      res.json(error);
    });
});

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

// server.delete('/api/users/:id', (req, res) => {
//   const id = req.params.id;
//   console.log(req.params.id);
//   db
//     .remove(id)
//     .then(users => {
//       if (users.length === 0) {
//         return res.status(404).json({
//           message: "The user with the specified ID does not exist."
//         })
//       }
//       res.status(200).json(users)
//     })
//     .catch(error => {
//       res.status(500).json({
//         error: "The user could not be removed"
//       })
//     })
// });
server.delete('/api/users/:id', (req, res) => {
  const {
    id
  } = req.params;
  db
    .remove(id)
    .then(response => {
      if (response === 0) {
        sendUserError(404, 'The user with that ID does not exist."', res);
        return;
      }
      res.json({
        success: `User with id: ${id} removed from system`
      });
    })
    .catch(error => {
      sendUserError(500, 'The user could not be removed', res);
      return;
    });
});

// server.put('/api/users/:id', (req, res) => {
//   const id = req.params.id;
//   const users = {
//     name: req.body.name,
//     bio: req.body.bio
//   }
//   db
//     .update(id, users)
//     .then(users => {
//       if (!users) {
//         return res.status(404).json({
//           message: "The user with the specified ID does not exist."
//         })
//       }
//       if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('body')) {
//         return res.status(400).json({
//           errorMessage: "Please provide name and bio for the user."
//         })
//       }
//       res.status(200).json(users)
//     })
//     .catch(error => {
//       res.status(500).json({
//         error: "The user information could not be modified."
//       })
//     })
// });
// server.put('/api/users/:id', (req, res) => {
//   const {
//     id
//   } = req.params;
//   console.log('req.params', req)
//   const {
//     name,
//     bio
//   } = req.body;
//   if (!name || !bio) {
//     sendUserError(400, 'Must provide name and bio', res);
//     return;
//   }
//   db
//     .update(id, {
//       name,
//       bio
//     })
//     .then(response => {
//       console.log('response', response);
//       if (response == 0) {
//         sendUserError(
//           404,
//           'The user with the specified ID does not exist.',
//           res
//         );
//         return;
//       }
//       db
//         .findById(id)
//         .then(user => {
//           if (user.length === 0) {
//             sendUserError(404, 'User with that id not found', res);
//             return;
//           }
//           res.json(user);
//         })
//         .catch(error => {
//           res.send().json({
//             message: "asdf"
//           })
//         });
//     })
//     .catch(error => {
//       sendUserError(500, 'Something bad happened in the database', res);
//       return;
//     });
// });

server.listen(port, () => console.log(`server runnering on port ${port}`));

