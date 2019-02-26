// implement your API here
const express = require('express');
const db = require('./data/db.js')

const server = express();

// Fetch all Users

server.get('/', (req, res) => {
    db.find()
        .then(users => {
            res.send({ users });
        })
        .catch(err => {
            res.send(err)
        }) 
});

server.listen(8000, () => console.log('Api is running on port 8000'))