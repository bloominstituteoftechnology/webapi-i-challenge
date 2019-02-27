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
      .then(user => res.json(user))
      .catch(({ code, message }) => res.status(code).json({ err: message }))
  } else {
    res.status(400).json({ err: 'Please fill out all fields' })
  }
})

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => res.json(users))
    .catch(({ code, message }) => res.status(code).json({ err: message }))
})

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params
  db.findById(id)
    .then(user =>
      user ? res.json(user) : res.status(404).json({ err: 'User not found' })
    )
    .catch(({ code, message }) => res.status(code).json({ err: message }))
})

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params
  db.remove(id)
    .then(user =>
      user
        ? res.status(200).json({ err: 'Removed user at id: ' + id })
        : res.status(404).json({ err: 'User not found' })
    )
    .catch(({ code, message }) => res.status(code).json({ err: message }))
})

server.put('/api/users/:id', (req, res) => {
  if (req.body.name && req.body.bio) {
    const { id } = req.params
    const { name, bio } = req.body
    db.update(id, { name, bio })
      .then(user =>
        user ? res.json(user) : res.status(404).json({ err: 'User not found' })
      )
      .catch(({ code, message }) => res.status(code).json({ err: message }))
  } else {
    res.status(400).json({ err: 'Please fill out all fields' })
  }
})
