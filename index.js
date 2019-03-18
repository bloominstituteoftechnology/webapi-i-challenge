// implement your API here
const express = require('express')
const server = express()
const port = 5000

server.use(express.json())
const db = require('./data/db')

server.get('/', (req, res) => {
  res.send(`I'm inside the server!`)
})

// ENDPOINTS
// Get all users
server.get('/api/users', (req, res) => {
  db.find()
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
server.get('/api/users/:id', (req, res) => {
  const { id } = req.params

  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user)
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' })
      }
    })
    .catch(() =>
      res
        .status(500)
        .json({ error: 'The user information could not be retrieved.' })
    )
})

// Post new user
server.post('/api/users', (req, res) => {
  const user = req.body

  if (user.name && user.bio) {
    db.insert(user)
      .then(user => {
        res.status(201).json(user)
      })
      .catch(() =>
        res.status(500).json({
          error: 'There was an error while saving the user to the database'
        })
      )
  } else {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' })
  }
})

// Delete user by id
server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params

  db.remove(id)
    .then(user => {
      if (user) {
        res.status(200).json({ message: 'The use was sucessfully deleted' })
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' })
      }
    })
    .catch(() =>
      res.status(500).json({ error: 'The user could not be removed' })
    )
})

// Put user by id
server.put('/api/users/:id', (req, res) => {})

server.listen(5000, () => console.log(`Server running on port ${port}`))
