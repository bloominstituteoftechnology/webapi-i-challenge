// implement your API here
const express = require('express'); // builds server
const cors = require('cors'); // install this package to connect from react
const db = require('./data/db');

 const server = express(); // creates server

 server.use(cors()); // this needed to connect from react

 server.get('/', (req, res) => { 
   // request/route handler
  res.send('<h1>Hello FSW13!<h1>');
 });
  
// GET request to /api/users 

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
 
// GET request to /api/users/:id

 server.get('/api/users/:id', (req, res) => {
   db.findById(req.params.id) // pull in database from '.db' then Get 'ID' from 'req.params'
   .then((user) => {
    //  Below we create some logic to check what will be retunred either the 'ID' or an '404 status'
     if (user.length === 0) { // Says if user doesn't exist then run code below
       return res
       .status(404)
       .json({message: "The user with the specified ID does not exist."});
     } else
     console.log(user);
    res.status(200).json(user); // If user exists send the user/response.
   })
   .catch(() => 
  //  Error
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