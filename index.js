const express = require('express')
const db = require('./data/db')

const server = express()

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

server.listen(8000, () => console.log('API RUNNING'))
