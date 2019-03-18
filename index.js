// implement your API here
const express = require('express')
const server = express()
const port = 5000

server.use(express.json())
const users = require('./data/db')

server.get('/', (req, res) => {
  res.send(`I'm inside the server!`)
})

// ENDPOINTS
// Get all users
server.get('/api/users', (req, res) => {
  users
    .find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved.' })
    })
})

// Get user by id
server.get('/api/users/:id', (req, res) => {})

// Post new user
server.post('/api/users', (req, res) => {})

// Delete user by id
server.delete('/api/users/:id', (req, res) => {})

// Put user by id
server.put('/api/users/:id', (req, res) => {})

server.listen(5000, () => console.log(`Server running on port ${port}`))
