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
            res.status(200).json({ success: true, users })
        })
        .catch(err => {
            res.status(500).json({ success: false, message: err.message })
        });
});

server.get('/api/users/:id', (req, res) => {
    res.send('get users id');
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