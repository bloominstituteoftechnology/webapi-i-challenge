// implement your API here
const express = require('express');
const db = require('./data/db.js');

const server = express();

server.get('/', (req, res) => {
    res.json('livin!')
})

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ message: 'we failed', error: err });
        });
});

server.listen(8500, () => console.log('listening...'));