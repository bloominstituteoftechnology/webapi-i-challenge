// implement your API here
const express = require('express')
const cors = require('cors')

const server = express()
const port = process.env.PORT || 8000

// defines the body. must use to allow post request to work
server.use(express.json())
server.use(cors())

const database = require('./data/db.js')

server.get('/', (req, res) => {
    res.send('Hello World with cors!')
})

server.get('/api/users', (req, res) => {
    database.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({ message: "The users information could not be retrieved." })
    }) 
})

server.get('/api/users/:id', (req, res) => {
    let {id} = req.params
    database.findById(id)
    .then(user => { 
        if(user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }        
    }).catch(err => {
        res.status(500).json({ message:"The users information could not be retrieved." })
    })
})

server.post('/api/users', (req, res) => {
    const user = req.body

    database.insert(user)
    .then(users => {
        if (users) {
            res.status(201).json(users)
        } else {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        }     
    })
    .catch(err => { 
        res.status(500).json({ error: "There was an error while saving the user to the database" })
    })
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id

    database.remove(id)
    .then(users => {
        if (users) {
            res.json(users)
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The user could not be removed" })
    })
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const { name, bio } = req.body
    console.log(id, name, bio)

    if (!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    database.update(id, req.body)
    .then(user=> {
        if (user) {
            res.status(200).json(req.body)
            } else {   
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    }) 
    .catch(err => {
        res.status(500).json({ error: "The user information could not be modified." })
    })
})

server.listen(port, () => console.log(`Listening on port ${port}`))