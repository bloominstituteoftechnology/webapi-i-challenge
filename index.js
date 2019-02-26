// implement your API here
const express = require('express');
const db = require('./data/db.js')

const server = express();

// Fetch all Users

server.get('/', (req, res) => {
    res.send('Hello database afficionados!!');
});

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json({ users });
        })
        .catch(err => {
            res.status(500).res.send("The users information could not be retrieved.")
        }) 
});

// Fetch a User 

server.get('/api/users/:userid', (req, res) => {
    const id = req.params.userid;
    db.findById(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => res.send("The user with the specified ID does not exist."));
})


server.listen(8000, () => console.log('Api is running on port 8000'))