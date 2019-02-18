// implement your API here
const express = require('express');
const database = require('./data/db.js');

const server = express();

// middleWare
server.use(express.json());

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
                message: "The information about the users could not be retrieved"
            })
        })
});

// Read for /users/:id
server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    database
        .findById(id)
        .then(user => {
            if (user) {
                res.status(200).json({
                    success: true,
                    user
                })
            } else {
                res.status(404).json({
                    success: false,
                })
            }
        })
        .catch()
});

// Create
server.post('/api/users', (req, res) => {
    const user = req.body;
    database
        .insert(user)
        .then(user => {
            res.status(201).json({
                success: true, user
            })
        })
        .catch(error => {
            res.status(500).json({
                error: "There was an error while saving the user to the database"
            })
        })
});

// Update
server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    database
        .update(id, changes)
        .then(updated => {
            if (updated) {
                res.status(200).json({
                    success: true, updated
                })
            } else  {
                res.status(404).json({
                    success: false,
                    message: "The user with the specified ID does not exist."
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                error: "The user information could not be modified."
            })
        })
});

// Delete
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    database
        .remove(id)
        .then(deleted => {
            res.status(204).end()
        })
        .catch(error => {
            res.status(500).json({
                message: "The user could not be removed"
            })
        })
});


server.listen(8000, () => console.log('API running on port 8000'));