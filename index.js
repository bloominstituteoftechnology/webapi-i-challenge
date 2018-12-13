// implement your API here
const express = require("express");

const db = require('./data/db')

const server = express();

const PORT = 4040;

server.get('/api/users/', (req, res) => {
 db.find()
   .then((users) => {
    res
     .json(users)
   })
   .catch(err => {
    res
     .status(500)
     .json({error: "The users information could not be retrieved."})
   })
})

server.get('/api/users/:id/', (req, res) => {
 const { id } = req.params;
 db.findById(id)
   .then(user => {
    if (user) {
     res.json(user)
    }
    else {
     res
      .status(404)
      .json({error: 'The user with the specified ID does not exist.'})
    }
   })
   .catch(() => {
    res
     .status(500)
     .json({error: "The user information could not be retrieved."})
   })
})


server.post('/api/users/', (req, res) => {
 const { name, bio } = req.body
 db.insert(name, bio)
   .then(user => {
    if (name, bio) {
     res
      .status(201)
      .json(user)
      .send(user)
    }
    else {
     res
      .status(400)
      .json({errorMessage: "Please provide name and bio for the user"})
    }
   })
   .catch(() => {
    res
     .status(500)
     .json({error: "There was an error while saving the user to the database."})
   })
})

server.delete('/api/users/:id/', (req, res) => {
 const { id, user } = req.params
 db.remove(id)
   .then(() => {
    if (id){
    res
     .status(200)
     .send({message: "User was removed from the database."})
    }
    else {
    if (!id){
    res
     .status(404)
     .json({message: "The user with the specified ID does not exist."})
    }
   }})
   .catch(() => {
    res
     .status(500)
     .json({error: "The user could not be removed."})
  })
})

server.put('/api/users/:id', (req, res) => {
 const { id } = req.params
 db.update(id, user)
 .then((user) => {
  if (id) {
   res
   res
    .status(200)
    .send(user)
    .json(user)
  }
  else {
   res
    .status(404)
    .json({message: "The user with specified ID does not exist."})
  }
  if (!(name || bio)){
   res
    .status(400)
    .json({errorMessage: "Please provide name and bio for the user."})
  }
  if (id){
   res
    .status(200)
    .send(user)
    .json(user)
  }
 })
 .catch(() => {
  res
   .status(500)
   .json({error: "The user information could not be modified."})
 })
})
server.listen(PORT, () => {
 console.log(`Server running live on ${PORT}`)
});