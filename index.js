// implement your API here
const express = require('express');

const db = require('./data/db');
const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: "The users information could not be retrieved.",
                    message: err
                })
        })
});

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const message404 = { message: "The user with the specified ID does not exist." };
    const errorMessage = { error: "The users information could not be retrieved." };

    db
        .findById(userId)
        .then(user => {
            console.log('user ', user);
            user.length === 0 ?
                res.status(404).json(message404)
                : res.status(200).json(user);
        })
        .catch(err => { res.status(500).json(errorMessage) })
});

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    console.log('user info: \n', req.body);

    if (name && bio) {
        console.log('req.body contains a name and bio');
        db
            .insert({ name, bio })
            .then(user => { res.status(201).json(user) })
            .catch(err => {
                console.log('Error posting to /api/users ', err);
                res
                    .status(500)
                    .json({
                        message: err,
                        error: "There was an error while saving the user to the database"
                    })
            })
    }
    else {
        res
            .status(400)
            .json({ errorMessage: 'Please provide name and bio for the user.' });
    }
});

server.listen(5000, () => {
    console.log('\n Server running on localhost:5000 \n');
});