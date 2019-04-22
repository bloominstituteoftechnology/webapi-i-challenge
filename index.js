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
            res.status(500).json({
                error: "The users information could not be retrieved.",
                message: err
            })
        })
});

server.listen(5000, () => {
    console.log('\n Server running on localhost:5000 \n');
});