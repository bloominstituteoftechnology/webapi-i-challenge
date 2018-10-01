// implement your API here
const express = require('express');
const cors = require('cors'); // install this package to connect from react
const db = require('./data/db');

 const server = express(); // creates server

 server.use(cors()); // this needed to connect from react

 server.get('/', (req, res) => { 
   // request/route handler
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
    res.status(200).json(user);
   })
   .catch(err => 
     res.status(404)
     .json({message: "The user with the specified ID does not exist."})
   )
 })



 // watch for traffic in a particular computer port
 const port = 8000;
 server.listen(port, () => 
  console.log(`\n=== API running on ${port} ===\n`)
 );
//  http://localhost:3000 > 3000 is the port.