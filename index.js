const express = require('express');
const server = express();
const db = require('./data/db');

server.use(express.json());


server.get('/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(500).json({ error: 'users information could not be retrieved' })
        })
});

server.get('/users/:id', (req, res) => {
    const {id} = req.params
    db.findById(id)
        .then(response => {
            if (response.length < 1) {
                res.status(404).json({ message: 'the user with the specified ID does not exist' })
            } else {
                res.json(response)
            }
        })
        .catch(() => {
            res.status(500).json({ message: 'The user information could not be retrieved' })
        })
})

server.post('/users', (req, res) => {
    const user = req.body;
    if (user.name == null || user.bio == null) {
        res.status(400).json({ message: 'Please provide name and bio for the user' })
    }
    db.insert(user)
        .then(user => {
                res.status(201).json(user)
            }
        )
        .catch(() => {
            res.status(500).json({ error: 'There was an error while saving the user to the database' })
        })
})

server.delete('/users/:id', (req, res) => {
    const {id} = req.params;
    db.remove(id)
        .then(response => {
            if ( response == id ) {
                res.status(200).json(response)
            } else {
                res.status(404).json({ message: 'The user with the specified ID does not exist.'})
            }
        })
        .catch(() => {
            res.status(500).json({ error: 'the user could not be removed' })
        })
})



server.listen(8000, () => console.log('API running...'))
