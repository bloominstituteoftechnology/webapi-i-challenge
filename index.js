const express = require('express');
const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/users', (req, res) => {
    db.find()
    .then(users => {
        res.json(users)
})
.catch(() => {
    res.status(500).json({ error: "The users information could not be retrieved."})
})
})

server.get('/users/:id', (req, res) => {
    const id = req.params.id 
    db.findById(id)
    .then(response => {
        if (response.length === 0) {
            res.status(404).json({ message: "The user with the specified ID does not exist."})
        }
        else{
            res.status(200).json(response)
        }
    })
    .catch(() => {
        res.status(500).json({ error: "The user information could not be retrieved."})
    })
})

server.post('users', (req, res) => {
    const user = req.body;
    if (user.name == null || user.bio == null) {
        res.status(400).json({message: 'Please provide name and bio for the user.'})
    }
})

server.listen(8000, () => console.log('API running...'));
