// import express from 'express'; // ES Modules
const express = require('express'); // CommonJS
const db = require('./data/db');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send('Hello World');
});

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json({users});
        })
        .catch(error => {
            res.status(500).json({error: 'The users information could not be retrieved.'});
        });
});

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    db.findById(id)
        .then(user => {
            if(user[0]) {
                res.status(200).json({user});
            } else {
                res.status(404).json({error: 'The user with the specified ID does not exist.'});
            }
        })
        .catch(error => {
            res.status(500).json({error: 'The user information could not be retrieved.'});
        });
});

server.listen(8000, () => console.log('API running...'));
