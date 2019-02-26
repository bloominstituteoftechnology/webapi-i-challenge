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
            if (users) {
                res.status(200).json({ users });
            }
            else {
                res.status(500).json({ message: "The users information could not be retrieved." })
            }
        })
        .catch(err => {
            res.status(500).res.json(err)
        }) 
});

// Fetch a User 

server.get('/api/users/:userid', (req, res) => {
    const id = req.params.userid;
    db.findById(id)
        .then(user => {
            if(user) {
                res.status(200).json(user);
            }
            else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => res.status(500).json(err));
})


server.listen(8000, () => console.log('Api is running on port 8000'))