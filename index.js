// implement your API here
const express = require('express')
const db = require('./data/db.js')
const server= express()

server.use(express.json())

// GET request to path'/api/users'
server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'The users information could not be retrieved.'
            })
        })
});

// POST request to path'/api/users'
server.post('/api/users', (req, res) => {
    const {name, bio} = req.body;
    db.insert(name, bio)
        .then(user => {
            if(user) {
                res.status(201).json(user);
            } else {
                res.status(400).json({
                    message: 'Please provide name and bio for the user.'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'There was an error while saving the user to the database'
            })
        })
});

// DELETE request to path'/api/users/:id'
server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    db.remove(id)
        .then(deletedUser => {
            if(deletedUser) {
                res.json(deletedUser);
            } else {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist.'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'The user could not be removed'
            })
        })
});

// PUT request to path'/api/users/:id'
server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const {name, bio} = req.body;
    if(name && bio) {
        db.update(id, req.body)
            .then(updatedUser => {
                if(updatedUser) {
                    res.status(200).json(updatedUser);
                } else {
                    res.status(404).json({
                        message: 'The user with the specified ID does not exist.'
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    err: err,
                    message: 'The user information could not be modified.'
                })
            })
    } else {
        res.status(400).json({
            message: 'Please provide name and bio for the user.'
        })
    }
});

// GET request to path'/api/users/:id'
server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    db.findById(id)
        .then(user => {
            if(user) {
                res.json(user)
            } else {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist.'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'The user information could not be retrieved.'
            })
        })
});