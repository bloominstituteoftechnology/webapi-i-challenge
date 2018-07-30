const express = require('express');
const server = express();
const db = require('./data/db');

server.use(express.json());


server.get('/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(500).json({ error: 'users information could not be retrieved' })
        })
})

server.listen(8000, () => console.log('API running...'))
