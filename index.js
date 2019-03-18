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
        res.status(200).json(req.body);
    })
    .catch(err => {

    })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
    .then(user => {
        if (user) {
            db.remove(id)
            .then(deleted => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(501).json({message: 'Server error'})
            })
        } else {
            res.status(500).json({message: 'Something went wrong'})
        }
    })
    .catch(err => res.status(404).json({message: 'User not found'}))
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const userInfo = req.body
    db.update(id, userInfo)
    .then(updated => {
        if (updated) {
            res.status(200).json(userInfo)
        } else {
            res.status(404).json({ message: "User not found"})
        }
    })
    .catch(err => {

    })
})

server.listen(5000, () => {
    console.log('API up and running on port 5000')
  });  