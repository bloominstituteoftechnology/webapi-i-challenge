// implement your API here
const express = require('express');
const db = require('./data/db.js');
const server = express();
server.use(express.json());

// Fetch all Users

server.get('/', (req, res) => {
    res.json('Hello Database Afficionados!!');
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

// Post a User

server.post('/api/users', (req, res) => {
    const user = req.body;
    if (user.name && user.bio) {
        db.insert(user)
            .then(idInfo => {
                db.findById(idInfo.id).then(user => {
                    res.status(201).json(user);
                });
            })
            .catch(err => res.status(500).json({
                message: 'Failed to insert user in db'
            }));
    }
    else {
        res.status(400).json({ message: "Please provide name and bio for the user." })
    }
})

server.listen(8000, () => console.log('Api is running on port 8000'))