const express = require('express')
const db = require('./data/db')

const server = express()
server.use(express.json())

server.get('/api/users', (req, res) => {
  db
    .find()
    .then((users) => res.status(200).json(users))
    .catch((err) =>
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved.' })
    )
})

server.get('/api/users/:id', (req, res) => {
  console.log(req.params.id)
  db
    .findById(req.params.id)
    .then((users) => res.status(200).json(users))
    .catch((err) =>
      res
        .status(404)
        .json({ message: 'The user with the specified ID does not exist.' })
    )
})

server.delete('/api/users/:id', (req, res) => {
  db
    .remove(req.params.id)
    .then((users) => res.status(200).json(users))
    .catch((err) =>
      res
        .status(404)
        .json({ message: 'The user with the specified ID does not exist.' })
    )
})

server.post('/api/users', (req, res) => {
  const user = req.body
  db
    .insert(user)
    .then((users) => res.status(201).json(users))
    .catch((err) =>
      res
        .status(400)
        .json({ errorMessage: 'Please provide name and bio for the user.' })
    )
})

server.put('/api/users/:id', (req, res) => {
  const user = req.body
  const id = req.params.id
  db
    .update(id, user)
    .then((users) => res.states(200).json(users))
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'The user information could not be modified.' })
    })
})

server.listen(8000, () => console.log('API RUNNING'))
