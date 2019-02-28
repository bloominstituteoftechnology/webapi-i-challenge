// implement your API here
const express = require('express')

const server = express()

// defines the body. must use to allow post request to work
server.use(express.json())

const database = require('./data/db.js')

server.get('/', (req, res) => {
    res.send('Hello World!')
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
        res.status(201).json(users)
    })
    .catch(err => {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    })
})

server.listen(8000, () => console.log('API port 8000'))