// implement your API here
const express = require('express');
const db = require("./data/db");

const server = express();
const parser = express.json()
const PORT ='9090';

server.use(parser);

// POST

server.post('/api/users', (req, res)=>{
  const newUser =req.body;
  const { name, bio } = req.body;
  if (!name || !bio){
    return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  }
  db.insert(newUser)
  .then (user => {
    res.status(201).json(user)
  })
  .catch(err=>{
    res.status(500).json({ error: "There was an error while saving the user to the database" })
  })

})

// GET

// GET ID

// DELETE

// PUT




server.listen(PORT, () => {
  console.log(`My server ${PORT}`)
})