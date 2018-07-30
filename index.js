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

server.listen(8000, () => console.log('API running...'))
