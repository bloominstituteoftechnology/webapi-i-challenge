// implement your API here //
const express = require('express');

const db = require('./data/db.js');

const server = express();

// middleware
server.use(express.json());

// endpoints

server.get('/', (req, res) => {
    res.send('<h2>Hello, I work!</h2>');
});

server.listen(4000, () => {
    console.log('\n *** Running on port 4000 *** \n');
});