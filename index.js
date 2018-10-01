// implement your API here

////In node, everything is a module.

const express = require('express');

const cors = require('cors');

const db = require('./data/db.js');

const server = express();

server.use(cors());

server.get('/', (req, res) => { // request/route handle
    res.send('<p>Here I be</p>');
});

server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        console.log('\n** users **', users);
        res.json(users);
    })
    .catch(err => res.send(err))
});

const port = 8000;
server.listen(port, () =>
console.log(`\n==== API running on port ${port} === \n`))