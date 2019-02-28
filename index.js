// implement your API here
const express = require('express');

const server = express();

const users = require('./data/db')

const PORT = 8080;

// Creates a user using the information sent inside the request body
server.post('/api/users', (req,res) => {
    const newUser = req.body;
    users.insert(newUser)
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        console.log('err:',err)
    })
})

// Returns an array of all the user objects contained in the database
server.get('/api/users', (req,res) => {
    users.find()
    .then(users => {
        res.send(users)
    })
    .catch(err => {
        console.log('err:',err)
    })
})

// Returns the user object with the specified id
server.get('/api/users/:id', (req,res) => {
    const { id } = req.params;
    users.findById(id)
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        console.log('err:',err)
    })
})

// Removes the user with the specified id and returns the deleted user
server.delete('/api/users/:id', (req,res) => {
    const { id } = req.params;

    users.remove(id)
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        console.log('err:',err)
    })
})

server.put('/api/users/:id', (req,res) => {
    const { id } = req.params;
    const updateUser = req.body;

    users.update(id, updateUser)
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        console.log('err:',err)
    })
})
server.listen(`${PORT}`, () => {
    console.log(`Server is listening on port: ${PORT}`)
})