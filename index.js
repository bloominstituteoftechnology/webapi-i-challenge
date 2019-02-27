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
          .then(stuff => {
              res.status(201).json(stuff)
          })
          .catch(err => {
            res.status(500).json({ error: "There was an error while saving the user to the database" });
          })
    } else {
        res.status(400).message({ errorMessage: "Please provide name and bio for the user." })
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})