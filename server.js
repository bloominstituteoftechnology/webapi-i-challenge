const express = require('express');
const db = require('./data/db');

const server = express();
const port = 5000;
server.use(express.json());

server.get(`/api/users`, (req, res) => {
    db
        .find()
        .then( response => {
            res.send(response);
        })
        .catch( err => {
            res.json(err);
        });
});

server.post(`/api/users`, (req, res) => {
    const { name, bio } = req.body;
    db
        .insert({ name, bio })
        .then( response => {
            res.send(response);
        })
        .catch( err => {
            res.json(err)
        });
});

server.get(`/api/users/:id`, (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then( response => {
            res.send(response);
        })
        .catch( err => {
            res.json(err)
        });
});

server.delete(`/api/users/:id`, (req, res) => {
    const { id } = req.params;
    db
        .remove(id)
        .then( response => {
            res.send(response);
        })
        .catch( err => {
            res.json(err)
        });
});

server.listen(port, () => console.log(`Server running on port ${port}`));