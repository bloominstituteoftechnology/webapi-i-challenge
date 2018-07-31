const express = require('express');
const server = express();
const db = require('./data/db');

server.use(express.json());

server.get('/users', (req, res) => {
    db.find()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(() => {
            res.status(500).json({ error: "The users information could not be retrieved."})
        })
})

server.listen(8000, () => console.log("Server up on port 8000"))