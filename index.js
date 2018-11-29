// implement your API here
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./data/db.js');
const PORT = 3000;

const server = express();
server.use(bodyParser.json());

server.post('/api/users', (req, res) => {
    db.insert();
})

server.get('/api/users', (req, res) => {
    db.find()
        .then((users) => {
            res.json(users);
        })
        .catch(err => {
            res.status(500)
                .json({ message: "The users information could not be retrieved." })
        })    
})



server.listen(PORT);