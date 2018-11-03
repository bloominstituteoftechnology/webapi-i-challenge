// implement your API here
const express = require('express')
const server = express()
const db = require('./data/db')
const port = 3333
server.use(express.json())

server.get('/', (req, res) => res.send('Hiya'))

server.post('/api/users', (req, res) => {
    const {name, bio} = req.body
    db.insert({name, bio}).then(response => res.send(response)).catch(err =>res.json(err))
})

server.get('/api/users', (req, res) => {
    db.find().then(users =>{
        res.json({users})
    })
})

server.listen(port, ()=>console.log(`I hear you ${port}`))