const express = require('express')
const server = express()
const parser = express.json()

const db = require('./data/db.js')
const PORT = '8888'

server.use(parser)
server.listen(PORT, _ => console.log(`listening on http://localhost:${PORT}`))

server.post('/api/users', (req, res) => {
  if (req.body.name && req.body.bio) {
    const { name, bio } = req.body
    db.insert({ name, bio })
      .then(user => res.status(201).json(user))
      .catch(err =>
        res.status(500).json({
          error: 'There was an error while saving the user to the database'
        })
      )
  } else {
    res.status(400).json({ error: 'Please provide name and bio for the user.' })
  }
})

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => res.json(users))
    .catch(err =>
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved.' })
    )
})

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params
  db.findById(id)
    .then(user =>
      user
        ? res.json(user)
        : res
            .status(404)
            .json({ message: 'The user with the specified ID does not exist.' })
    )
    .catch(err =>
      res
        .status(500)
        .json({ error: 'The user information could not be retrieved.' })
    )
})

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params
  db.remove(id)
    .then(user =>
      user
        ? res.status(200).json({ err: 'Removed user at id: ' + id })
        : res
            .status(404)
            .json({ message: 'The user with the specified ID does not exist.' })
    )
    .catch(err =>
      res.status(500).json({ error: 'The user could not be removed' })
    )
})

server.put('/api/users/:id', (req, res) => {
  if (req.body.name && req.body.bio) {
    const { id } = req.params
    const { name, bio } = req.body
    db.update(id, { name, bio })
      .then(user =>
        user
          ? res.status(200).json({ id, name, bio })
          : res.status(404).json({
              message: 'The user with the specified ID does not exist.'
            })
      )
      .catch(err =>
        res
          .status(500)
          .json({ error: 'The user information could not be modified.' })
      )
  } else {
    res.status(400).json({ error: 'Please provide name and bio for the user.' })
  }
})
