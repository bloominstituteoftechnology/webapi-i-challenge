const express = require('express');
const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ message: 'Error retrieving users'});
    })
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {

    })
})

server.post('/api/users', (req, res) => {
    db.insert(req.body)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {

    })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {

    })
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const userInfo = req.body
    db.update(id, userInfo)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {

    })
})

server.listen(5000, () => {
    console.log('API up and running on port 5000')
  });  