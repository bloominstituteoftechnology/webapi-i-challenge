// implement your API here: 

const express = require('express');//Importing express from express package


const Users = require('./data/db');
//Users has  find(), findById(), insert(), remove(), update() methods

const server = express('');//instance of a server powered by express

server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello World');
});


//CHALLENGE: Create endpoint that returns a list of users stored in a database
server.get('/users', (req,res) => {
   Users.find()
   .then(users => {
       res.status(200).json(users);
   })
   .catch(() => {
       res.status(500).json({
           errorMessage: 'The users information could not be retrieved'
       });
   });
});


const port = 5000;
server.listen(port, () => console.log(`API running on port ${port}`));
