// implement your API here
const express = require('express');

const db = require('./data/db');
const server = express();

server.use(express.json());

const message404 = { message: "The user with the specified ID does not exist." };
const message500 = { error: "The users information could not be retrieved." };


server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res
                .status(500)
                .json(message500)
        })
});

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    db
        .findById(userId)
        .then(user => {
            user.length === 0 ?
                res.status(404).json(message404) :
                res.status(200).json(user);
        })
        .catch(err => { res.status(500).json(message500) })
});

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    const errorMessage500 = { error: "There was an error while saving the user to the database" }
    const errorMessage400 = { errorMessage: 'Please provide name and bio for the user.' }

    if (name && bio) {
        console.log('req.body contains a name and bio');
        db
            .insert({ name, bio })
            .then(user => { res.status(201).json(user) })
            .catch(err => { res.status(500).json(errorMessage500) })
    }
    else {
        res.status(400).json(errorMessage400);
    }
});

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const messageSuccess = { success: `User with id: ${id} removed from system` };

    db
        .remove(id)
        .then(response => {
            response === 0 ?
                res.status(404).json(message404)
                : res.json(messageSuccess);
        })
        .catch(error => {
            res.status(500).json(message500);
        });
});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    const updateError = { error: "The user information could not be modified." };
    const removeError = { error: "The user could not be removed" }

    if (name === '' || bio === '') {
        res.status(404).json(removeError);
    }
    else {
        db
            .update(id, { name, bio })
            .then(response => {
                response === 0 ?
                    res.status(404).json(message404) :
                    res.status(200).json(response)
            })
            .catch(error => { res.status(500).json(updateError) });
    }
});

server.listen(5000, () => {
    console.log('\n Server running on localhost:5000 \n');
});