// implement your API here

// Import Express
const express = require('express');

// Import db
const db = require('./data/db.js');

// Initialize Express
const server = express();

// Middleware
server.use(express.json());


// CREATE
server.post('/api/users', (req, res) => {
    const { name, bio, created_at, updated_at } = req.body;
    if(!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    db.insert({ name, bio, created_at, updated_at })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the user to the database" })
        })
});


// READ
server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ error: "The users information could not be retrieved." })
        });
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        })
});


// UPDATE
server.put('/api/users/:id', (req, res) => {
    res.send('put user id');
});


// DESTROY
server.delete('/api/users/:id', (req, res) => {
    res.send('delete user id');
});


// Run Server
server.listen(3000, () => {
    console.log(`Server running.`);
});