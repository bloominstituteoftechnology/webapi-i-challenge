const express = require('express')
const db = require('./data/db')

// initialize Express
const server = express()

// middleware to parse incoming data
server.use(express.json())

// setup Port
const port = process.env.port || 5000
server.listen(port, () => console.log(`Server listening on ${port}`))

// route handlers
const getUsers = async (req, res) => {
  try {
    const users = await db.find()
    return res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error, msg: 'Error getting users from database' })
  }
}

const getUserById = async (req, res) => {
  const userId = req.params.userId

  try {
    const user = await db.findById(userId)
    if (user) {
      return res.status(200).json(user)
    } else {
      return res.status(404).send(`User ID ${userId} does not exist`)
    }
  } catch (error) {
    res.status(500).json({ error, msg: `Error getting user ID ${userId}` })
  }
}

const postUser = async (req, res) => {
  const newUser = req.body
  if (!newUser.name || !newUser.bio) {
    return res.status(400).send('Must provide user name and bio')
  }

  try {
    const isInserted = await db.insert(newUser)
    if (isInserted) {
      try {
        const users = await db.find()
        return res.status(201).json(users)
      } catch (error) {
        res
          .status(500)
          .json({ error, msg: 'Error getting users from database' })
      }
    }
  } catch (error) {
    res.status(500).json({ error, msg: 'Error creating new user' })
  }
}

const deleteUserById = async (req, res) => {
  const userId = req.params.userId

  try {
    const isDeleted = await db.remove(userId)
    if (isDeleted) {
      try {
        const users = await db.find()
        return res.status(201).json(users)
      } catch (error) {
        res
          .status(500)
          .json({ error, msg: 'Error getting users from database' })
      }
    } else {
      return res.status(404).send(`User ID ${userId} does not exist`)
    }
  } catch (error) {
    res.status(500).json({ error, msg: `Error deleting user ID ${userId}` })
  }
}

const putUserById = async (req, res) => {
  const userId = req.params.userId

  const newUser = req.body
  if (!newUser.name || !newUser.bio) {
    return res.status(400).send('Must provide user name and bio')
  }

  try {
    const isUpdated = await db.update(userId, newUser)
    if (isUpdated) {
      try {
        const users = await db.find()
        return res.status(200).json(users)
      } catch (error) {
        res
          .status(500)
          .json({ error, msg: 'Error getting users from database' })
      }
    } else {
      return res.status(404).send(`User ID ${userId} does not exist`)
    }
  } catch (error) {
    res.status(500).json({ error, msg: `Error updating user ID ${userId}` })
  }
}

// routes
server.get('/', getUsers)
server.get('/:userId', getUserById)
server.post('/', postUser)
server.delete('/:userId', deleteUserById)
server.put('/:userId', putUserById)
