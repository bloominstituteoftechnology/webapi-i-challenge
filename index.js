const express = require('express');

const db = require('./data/db.js');

const server = express();

const { users } = db;

server.use(express.json());

server.get('/', (req, res) => {
    res.send("Yo Users")
})

server.listen(8000, () => {
    console.log('Listening on port 8000');
})