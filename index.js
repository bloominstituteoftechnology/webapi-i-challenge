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
})

server.listen(8000, () => console.log('API port 8000'))