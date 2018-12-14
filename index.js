// implement your API here

// require the express npm module, needs to be added to the project using "yarn add" or "npm install"
const express = require('express');

// creates an express application using the express module
const server = express();
const PORT = 3000;
const db = require('./data/db');

// configures our server toe execute a function for every GET request to "/"
// the second argument passed to the .get() method is the "Route Handler Function"
// the route handler function will run on every GET request to "/"
server.use(express.json());
server.get('/api/users', (req, res) => {
    const name = req.params.name;
    // express will pass the request and response objects to this function
    // the .send() on response object can be used to send a response to the client
    db.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: 'The users information could not be retrieved.' });
        });
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(users => {
            if (users) {
                res.json(users);
            } else {
                res.status(404).json({ message: 'user does not exist' });
            }
        })
        .catch(err => {
            res
                .status(404)
                .json({ message: 'The user with the specified ID does not exist.' });
        });
});

server.post('/api/users', (req, res) => {
    const user = req.body;
    if (user.name && user.bio) {
        db.insert(user)
            .then(idInfo => {
                db.findById(idInfo.id).then(user => {
                    res.status(201).json(user); // 201 means something has been created in the database? Unsure if better definition is available.
                });
            })
            .catch(err => {
                res.status(500).json({
                  error: 'There was an error while saving the user to the database'
                });
              });
     } else {
         res.status(400).json({ errorMessage: 'Please provide name and bio for the user.'});
     }
});

server.put('/api/users/:id', (req, res) => {
    const user = req.body;
    const { id } = req.params;
    if (user.name && user.bio) {
      db.update(id, user)
        .then(count => {
          if (count) {
            db.findById(id).then(user => {
              res.json(user);
            });
          } else {
            res
              .status(404)
              .json({
                message: 'The user with the specified ID does not exist.'
              });
          }
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: 'The user information could not be modified.'});
        });
    } else {
      res
        .status(400)
        .json({ errorMessage: 'Please provide name and bio for the user.' });
    }
  });

  server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    db.remove(id)
      .then(() => {
       if (id){
       res
        .status(200)
        .send({message: 'User was removed from the database.'});
       }
       else {
       if (!id){
       res
        .status(404)
        .json({message: 'The user with the specified ID does not exist.'});
       }
      }})
      .catch(() => {
       res
        .status(500)
        .json({error: 'The user could not be removed.'});
     })
   });
// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once

server.listen(PORT, () => console.log('API running on port ${PORT}'));