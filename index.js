const express = require('express');
const cors = require('cors');
const db = require('./data/db');

 const server = express();

 server.use(cors());

 server.get('/', (req, res) => { 
  res.send('<h1>Hello FSW13!<h1>');
 });

 server.get('/api/users', (req, res) => {
  db.find()
  .then((users) => {
    console.log(`** users **`, users)
    res.json(users);
  })
  .catch(() => {
    res.status(500).json({ error: "The users information could not be retrieved."});
  });
 });

 server.get('/api/users/:id', (req, res) => {
   db.findById(req.params.id)
   .then((user) => {
     if (user.length === 0) {
       return res
       .status(404)
       .json({message: "The user with the specified ID does not exist."});
     } else
     console.log(user);
    res.status(200).json(user);
   })
   .catch(() => 
     res.status(404)
     .json({message: "The user with the specified ID does not exist."})
   )
 })

 const port = 8000;
 server.listen(port, () => 
  console.log(`\n=== API running on ${port} ===\n`)
 );