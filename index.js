// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();
const port = 5000;

server.get('/', (req, res) => {
  res.send('Hello, I am up!');
});

server.get('/api/users', (req, res) => {
    db
      .find()
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: 'Oops, something wrong.' });
      });
  });

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
  
    db.findById(id)
      .then(user => {
        if (user) {
          res.json(user);
        } else {
          res
            .status(404)
            .json({ message: 'This user does not exist.' });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: 'The user information could not be retrieved.' });
      });
  });

server.post('/api/users', (req, res) => {
    const user = req.body
    db
      .insert(user)
      .then(users => {
           res.status(201).json(users)
      })
     .catch(err => {
        res.status(400).json({ message: "Provide name and bio for the user." })
     })
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    db
      .remove(id)
      .then(users => {
        if (users) {
            res.json(users)
        } else {
            res.status(404).json({ message: "This user does not exist." })
        }
     })
     .catch(err => {
        res.status(500).json({ error: "Something wrong" })
    })
})
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const { name, bio } = req.body
    console.log(id, name, bio)

    if (!name || !bio) {
        res.status(400).json({ message: "Please provide name and bio for the user." })
    }
    db
      .update(id, req.body)
      .then(user=> {
        if (user) {
            res.status(200).json(req.body)
            } else {   
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
      }) 
      .catch(err => {
        res.status(500).json({ error: "The user information could not be modified." })
    })
})

server.listen(port, () => console.log(`Server is listening at port ${port}`));