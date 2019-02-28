// implement your API here
const express = require('express');
const db = require("./data/db");

const server = express();
const parser = express.json()
const PORT ='9090';

server.use(parser);

server.get('/', (req, res) => {
  res.send(`Hello from local host ${PORT}`);
})

// POST

server.post('/api/users', (req, res)=>{
  const newUser =req.body;
  const { name, bio } = req.body;
  if (!name || !bio){
    return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  }
  db.insert(newUser)
  .then (users => {
    res.status(201).json(users)
  })
  .catch(err=>{
    res.status(500).json({ error: "There was an error while saving the user to the database" })
  })
})

// GET

server.get('/api/users', (req, res)=>{
  db.find()
    .then (user => {
      res.status(200).json(user);
    })
    .catch(err=> { 
      res.status(500).json({ error: "The users information could not be retrieved." })
  })
})

// GET ID

server.get('/api/users/:id', (req, res)=>{
  const id = req.params.id;

  db.findById(id)
  .then(user => {
    if(user){
      res.status(200).json(user)
    }else{
      
      return res.status(404).json({ error: "The user with the specified ID does not exist." })
    }
  })
  .catch(err=> { 
    res.status(500).json({ error: "The users information could not be retrieved." })
})
})
// DELETE

// PUT




server.listen(PORT, () => {
  console.log(`My server ${PORT}`)
})