const express = require('express');

const db = require('./data/db.js');

const server = express();

const { users } = db;

server.use(express.json());

server.get('/', (req, res) => {
    res.send("Yo Users")
})

server.get('/api/users', (req, res) => {
    db.find().then(users => {
        res.status(200).json(users)
    }).catch(({ code, message }) => {
        res.status(code).json({err: message});
    })
});

server.listen(9000, () => {
    console.log('Listening on port 9000');
})