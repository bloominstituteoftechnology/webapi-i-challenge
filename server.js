const express = require('express')
const db = require('./data/db')
const port = 5000;
const server = express()

server.use(express.json())
server.get('/', (req, res) => {
    // 1st arg: route where a resource can be interacted with
    //2nd arg: callback to deal with sending resonses, and handling incoming
    res.send('Hello from express')
})

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body
    db
        .insert({ name, bio })
        .then(response => {
            res.send(response)
        })
        .catch(error => {
            res.json(error)
        })
})

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.json(error)
        })
})

server.put('/api/users/:id', (req, res) => {
    const { name, bio } = req.body
    const id = req.params
    console.log(id)
    db
        .update(id, { name, bio })
        .then(res => {
            res.json(res)
        })
        .catch(error => {
            res.json(error)
        })
})

server.listen(port, () => console.log(`server running on port ${port}`))