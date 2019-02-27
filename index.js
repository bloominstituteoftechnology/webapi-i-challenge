// implement your API here
const express = require('express')

const server = express()
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
    })
})

server.listen(8000, () => console.log('API port 8000'))