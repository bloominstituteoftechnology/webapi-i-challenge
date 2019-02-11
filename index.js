// implement your API here //
const express = require('express');

const db = require('./data/db.js');

const server = express();

// middleware
server.use(express.json());

// endpoints

// Initial endpoint to make sure code works
server.get('/', (req, res) => {
    res.send('<h2>Hello, I work!</h2>');
});

// Project Endpoints
// GET: returns array of all user objects in the db

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.status(200).json({ success: true, users });
        })
        .catch(err => {
            res.status(err.code).json({ success: false, message: err.message });
        });
});

server.listen(4000, () => {
    console.log('\n *** Running on port 4000 *** \n');
});