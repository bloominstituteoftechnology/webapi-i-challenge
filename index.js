const express = require('express');
const server = express();
const util = require('util');
//const users = require('./data/seeds/users.js');
const db = require('./data/db.js');

server.get('/api/users', (req, res) => {
    db.find()
    .then (response => {
        res.json(response);
    })
    .catch(err => {
        res.status(500);
        res.json({error: 'The users information could not be retrieved.'})
    }) 
});

server.get('/api/users/:id', (req, res) => {
    db.findById()
    .then (response => {
        res.json(response);
    })
    .catch(err => {
        res.status(500);
        res.json({error: 'The user information could not be retrieved.'})
    }) 

});

server.listen(8000, () => console.log('API running'))