// implement your API here
const express = require('express');

const server = express();

const users = require('./data/db')

const PORT = 8080;

server.get('/api/users', (req,res) => {
    users.find()
    .then(users => {
        res.send(users)
    })
    .catch(err => {
        console.log('err:',err)
    })
})

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

server.listen(`${PORT}`, () => {
    console.log(`Server is listening on port: ${PORT}`)
})