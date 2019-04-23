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
            res.status(400).json({ error: err, message: "Please provide name and bio for the user." })
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
            res.status(500).json({ error: err, message: 'There was an error while saving the user to the database.'})
        })
})



// Get /api/users/:id

server.get('/api/users/:id', (req, res) => {
    const getId = req.params.id


    db
        .findById(getId)
        .then(user => {
            if ( user ) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(404).json({ error: err, message: 'The user information could not be retrieved.' })
        })
})



// Delete /api/users/:id

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id

    db
        .remove(userId)
        .then(deleted => {
            if ( deleted ) {
                res.status(200).json(deleted)
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'Error deleting the user' })
        })
})





// Put /api/users/:id

server.put('/api/users/:id', (req, res) => {
    const updateId = req.params.id
    const userToUpdate = req.body

    if ( !userToUpdate.name || !userToUpdate.bio ) {
        res.status(400).json("Must Provide Name and Bio")
    }

    db
        .update(updateId, userToUpdate)
        .then(updated => {
            if ( updated ) {
                res.status(200).json(updated)
            } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })}
        })
        .catch(err => {
            res.status(500).json({ error: err, message: `The user information could not be modified.` })
        })
})






server.listen(5000, () => {
    console.log('\n *** API Running on Port 5k *** \n')
})