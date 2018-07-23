const express = require('express');
const server = express();
const util = require('util');
//const users = require('./data/seeds/users.js');
const db = require('./data/db.js');


let id = 1;


server.get('/api/users', (req, res) => {
    db.find()
    .then (response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500);
        res.json({error: 'The users information could not be retrieved.'})
    }) 
});

server.get('/api/users/:id', (req, res) => {
    if (!id) {
        res.status(404);
        res.json({error: 'The user with the specified ID does not exist'});
    }
    db.findById()
    .then (response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500);
        res.json({error: 'The user information could not be retrieved.'})
    }) 
});

server.post('/api/users', (req, res) => {
    if (!name || !bio) {
        res.status(400);
        res.json({error: 'Please provide name and bio for the user.'})
    }
    const { name, bio } = req.body;
    const newUser = { name, bio, id: id }
    db.insert()
    .then (response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500);
        res.json({error: 'There was an error while saving the user to the database.'})
    }) 
    id++;
});

server.delete('/api/users/:id', (req, res) => {
    if (!id) {
        res.status(404);
        res.json({error: 'The user with the specified ID does not exist'});
    }
    db.remove()
    .then (response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500);
        res.json({error: 'The user information could not be removed.'})
    }) 
});

server.put('/api/users/:id', (req, res) => {
    if (!id) {
        res.status(404);
        res.json({error: 'The user with the specified ID does not exist'});
    }
    if (!name || !bio) {
        res.status(400);
        res.json({error: 'Please provide name and bio for the user.'})
    }
    db.update()
    .then (response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500);
        res.json({error: 'The user information could not be modified.'})
    }) 
});


server.listen(8000, () => console.log('API running'))