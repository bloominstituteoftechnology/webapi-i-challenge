// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();
const PORT = '5000'

server.use(express.json());

server.get('/api/users', (req, res) => {
    db.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ error: "The users information could not be retrieved." });
        })
})

server.post('/api/users', (req, res) => {
    const newUser = req.body;
    
    if(newUser.name && newUser.bio) {
        db.insert(newUser)
          .then(user => {
              res.status(201).json(user)
          })
          .catch(err => {
            res.status(500).json({ error: "There was an error while saving the user to the database" });
          })
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    console.log(id, updatedUser)
    if(updatedUser.name && updatedUser.bio) {
        db.update(id, updatedUser)
        .then(user => {
            if(user) {
                res.json(updatedUser);
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." }) 
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be modified." })
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." }) 
    }
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    if(id >= 0) {
        db.remove(id)
        .then(user => {
            if(user) {
                res.json(req.body);
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." }) 
            }
        })
        .catch(err =>
            res.status(500).json({ error: "The user could not be removed" })
        );
    } else {
        res.status(500).json({ error: "The user could not be removed" })
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})