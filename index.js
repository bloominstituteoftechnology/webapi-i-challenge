const db = require('./data/db')

// require the express module
const express = require('express')
const bodyParser = require('body-parser');

//Creates an express application using the express module
const server = express();
server.use(bodyParser.urlencoded({extended:false}));

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

server.get('/api/users', (req,res) => {
  db.find()
    .then( users => {
      res.status(200).json(users)
    }, reason => {
      res.status(500)
    });
})

server.get('/api/users/:id', (req,res) => {
  db.findById(req.params.id)
    .then( user => {
      (user.length > 0) ?  
        res.status(200).json(user): 
        res.status(404).send('The user with the specified ID does not exist.')
    }, reason => {
    });
})

server.post('/api/users', (req,res) => {
  // console.log(req)
  let newUser = {
    "name": "CrackBot",
    "bio": "CS11 Student at Lambda School",
    "created_at": "2018-04-02 19:01:14",
    "updated_at": "2018-04-02 19:01:14"
  }

  if (!newUser.hasOwnProperty('name') || !newUser.hasOwnProperty('bio'))
    res.status(400).send('Please provide name and bio for the user') 
  
  if (newUser.hasOwnProperty('name') && 
      newUser.hasOwnProperty('bio') && 
      newUser.hasOwnProperty('created_at') &&
      newUser.hasOwnProperty('updated_at')){
    db.insert(newUser)
    .then( user => res.status(200).json(user), 
      reason => {res.status(500)});
  }
  
})

server.delete('/api/users/:id', (req,res) => {
  db.remove(req.params.id)
    .then( numDel => {
      if (numDel === 0) res.status(404).send('ID not found.. try again')
      if (numDel > 0) res.status(200).send(`${numDel} user(s) was deleted `)
    }, 
    reason => {res.status(500)});
})
//set which port to listent to and the callback to run after the server starts
server.listen(8001, ()=> console.log('API running on port 8001 ....'))