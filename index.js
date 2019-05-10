// implement your API here
const express = require('express')
const db = require('./data/db.js')

const port = 8008

const server = express()
server.use(express.json())

server.listen(port, () => console.log(`server listening on port ${port}`))

//C
server.post('/api/users', (req, res) => {
    const {name, bio} = req.body
    if(!name || !bio)
        res
            .status(400)
            .json({error: `Please provide name and bio for the user.`})
    const now = new Date().toISOString()
    db
        .insert({
            name,
            bio,
            created_at: now,
            updated_at: now})
        .then(response =>
            res
                .status(201)
                .json(response))
        .catch(err =>
            res
                .status(500)
                .json({error: `Request Denied: ${err}`}))
})
//R
server.get('/api/users', (req, res) => {
    db.find()
        .then(users => 
            res
                .status(200)
                .json(users))
        .catch(err =>
            res
                .status(500)
                .json({error: `Request Denied: ${err}`}))
})
server.get('/api/users/:id', (req, res) => {
    const {id} = req.params
    db.findById(id)
        .then(user =>
            user
            ?   res
                    .status(200)
                    .json(user)
            :   res
                    .status(500)
                    .json({error: `User never existed!`}))
        .catch(err => res
            .status(500)
            .json({error: `Request Denied: ${err}`}))
})
//U
server.put('/api/users/:id', (req, res) => {
    console.log(req.body)
    console.log(req.params)
    const {id} = req.params
    const {name, bio, created_at, updated_at} = req.body
    if(!name || !bio)
        res
            .status(400)
            .json({error: 'Please provide name and bio for the user.'})
    const now = new Date().toISOString()
    const updatedUser = {
        name,
        bio,
        created_at,
        updated_at: now
    }
    db.update(id, updatedUser) 
        .then(response => 
            response
            ?   res
                    .status(200)
                    .json(response)
            :   res
                    .status(404)
                    .json({error: 'The user with the specified ID does not exist.'}))
        .catch(err =>
            res
                .status(500)
                .json({error: `The user information could not be modified.`}))
})
//D
server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params
    db.remove(id)
        .then(user => 
            user
            ?   res
                    .status(200)
                    .json(user)
            :   res
                    .status(500)
                    .json({error: `tried to delete user, lost`}))
        .catch(err => res
            .status(500)
            .json({error: `tried to delete user, couldn't find user.`}))
})