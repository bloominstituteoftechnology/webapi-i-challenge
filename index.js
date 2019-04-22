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

server.post('/api/users'), (req, res) => {
    const newUser = req.body
    console.timeLog('request body : ', newUser)

    db
      .insert(newuser)
      .then(user => {
          res.status(201).json(user)
      })
      .catch(err => {
          res.status
      })
}

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id 
    db
      .remove(userId)
      .then(deleted => {
          res.status(200).json(deleted)
      })
      .catch(err => {
          res.status(500).json({ error: err, message: 'The user could not be removed.'})
      })
})