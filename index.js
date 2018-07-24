const db = require('./data/db')

// require the express module
const express = require('express')

//Creates an express application using the express module
const server = express();


//configures our server to execute a function fro every GET request to "/"
// the second argument is the "Route Handler Function"
// the route handler function will run on every GET request to '/'
server.get('/', (req,res) => {

  // express will pass the req and res objects to this function

  res.send("Hello World")
})


server.get('/hobbits', (req, res) => {
  const hobbits = [
    {
      id: 1,
      name: 'Samwise Gamgee',
    },
    {
      id: 2,
      name: 'Frodo Baggins',
    },
  ];

  res.status(200).json(hobbits);
});

server.get('/users', (req,res) => {
  db.find()
    .then( users => {
      res.status(200).json(users)
    }, reason => {
      res.status(500)
    });
})

server.get('/users/:id', (req,res) => {
  db.findById(req.params.id)
    .then( user => {
      res.status(200).json(user)
    }, reason => {
      res.status(500)
    });
})

server.post('/users', (req,res) => {
  let newUser = {
    "name": "CrackBot",
    "bio": "CS11 Student at Lambda School",
    "created_at": "2018-04-02 19:01:14",
    "updated_at": "2018-04-02 19:01:14"
  }
  db.insert(newUser)
    .then( user => {
      res.status(200).json(user)
    }, reason => {
      res.status(500)
    });
})

//set which port to listent to and the callback to run after the server starts
server.listen(8001, ()=> console.log('API running on port 8001 ....'))