// implement your API here
const express = require('express');

const db = require('./data/db')

const server = express();


server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello Server Reader!!')
})


// Post /api/users
server.post('/api/users', (req, res) => {
    const userInfo = req.body

    db
        .insert(userInfo)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.json({ error: err, message: "Failed to Post" })
        })
})




// Get /api/users

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(db => {
            res.status(200).json(db)
        })
        .catch(err => {
            res.json({ error: err, message: 'Cannot find users'})
        })
})



// Get /api/users/:id

server.get('/api/users/:id', (req, res) => {
    const getId = req.params.id

    db
        .findById(getId)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'Could not find the specified user' })
        })
})



// Delete /api/users/:id

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id

    db
        .remove(userId)
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'Error deleting the user' })
        })
})





// Put /api/users/:id

server.put('/api/users/:id', (req, res) => {
    const updateId = req.params.id
    const userToUpdate = req.body

    db
        .update(updateId, userToUpdate)
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: `Can't find that ID to update`})
        })
})






server.listen(5000, () => {
    console.log('\n *** API Running on Port 5k *** \n')
})