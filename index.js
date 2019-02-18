// implement your API here
const express = require('express');
const database = require('./data/db.js');

const server = express();

server.get('/', (req, res) => {
    res.send('Hello World');
});

// Read
server.get('/api/users', (req, res) => {
    database
        .find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({
                message: 'Users not found'
            })
        })
});

// Create
server.post('/api/users', (req, res) => {
    const user = req.body;
    database
        .insert()
        .then()
        .catch()
});

// Update
server.put('/api/users/:id', (req, res) => {
    const {id} = req.params
});

// Delete
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    database
        .remove(id)
        .then()
        .catch()
});

server.listen(8000, () => console.log('API running on port 8000'));