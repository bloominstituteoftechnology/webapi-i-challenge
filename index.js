// implement your API here
const express = require('express')

const db = require('./data/db')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.send("Server is running")
})


server.listen(5000, () => {
    console.log('\n*** API running on port 5k ***\n')
})

server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        res.json({ error: err, message: 'Something broke'})
    })
})