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

// server.get('/api/users/:id', (req, res) => {
//     const userId = req.params.id

//     if (!(db.findById(userId))) {
//         return res.status(404).json({ message: "The user with the specified ID DOES exist." })
//     }

//     db
//     .findById(userId)
//     .then(user => {
//         res.json(user)
//     })
//     .catch(err => {
//         res.status(500).json({ error: err, message: "The user information could not be retrieved." })
//     })
// })

server.post('/api/users', (req, res) => {
    const newUser = req.body
    console.log('request body : ', newUser)

    if (!newUser.name && newUser.bio) {
        return res.status(400).json({errorMessage: "Please provide name and bio for user"})
    }

    db
      .insert(newUser)
      .then(user => {
          res.status(201).json(user)
      })
      .catch(err => {
          res.status(500).json({ error: err, message: 'Error adding user' })
      })
    
})

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id 

    if (!db.findById(userId)) {
        return res.status(404).json({ message: "The user with the specified ID does not exist." })
    }

    db
      .remove(userId)
      .then(deleted => {
          res.status(200).json(deleted)
      })
      .catch(err => {
          res.status(500).json({ error: err, message: 'The user could not be removed.'})
      })
})

server.put('/api/users/:id', (req, res) => {
    const userId = req.params.id
    const user = req.body

    db
      .update(userId, user)
      .then(user => {
          res.status(200).json(user)
      })
      .catch(err => {
          res.status(500).json({ error: err, message: "The user information could not be modified."})
      })  
})

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id

    if (db.findById(userId)) {
        db
    .findById(userId)
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        res.status(500).json({ error: err, message: "The user information could not be retrieved." })
    })
    } else {
        return res.status(404).json({ message: "The user with the specified ID DOES exist." })
    }
})
