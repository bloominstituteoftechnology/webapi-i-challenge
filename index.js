const db = require('./data/db')

// require the express module
const express = require('express')
const bodyParser = require('body-parser');

//Creates an express application using the express module
const server = express();
server.use(bodyParser.json());

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
    .then( user => {
      (user.length > 0) ?  
      res.status(200).json(user): 
      res.status(500).json({error: 'The users information could not be retrieved.'})
    }, reason => {
      res.status(500).send('users not found')
    });
})

server.get('/api/users/:id', (req,res) => {
  db.findById(req.params.id)
    .then( user => {
      (user.length > 0) ?  
        res.status(200).json(user): 
        res.status(404).json({error: 'The user with the specified ID does not exist.'})
    }, reason => {
      res.status(500).json({error: 'The users information could not be retrieved.'})
    });
})

server.post('/api/users', (req,res) => {
  let newUser = req.body;

  if (!newUser.hasOwnProperty('name') || !newUser.hasOwnProperty('bio'))
    res.status(400).json({errorMessage: 'Please provide name and bio for the user'}) 
  
  if (newUser.hasOwnProperty('name') && 
      newUser.hasOwnProperty('bio') && 
      newUser.hasOwnProperty('created_at') &&
      newUser.hasOwnProperty('updated_at')){
    db.insert(newUser)
    .then( user => res.status(200).json(user), 
      reason => {res.status(500).json({ error: "There was an error while saving the user to the database" })});
  }
  
})

server.delete('/api/users/:id', (req,res) => {
  db.remove(req.params.id)
    .then( numDel => {
      if (numDel === 0) res.status(404).json({message: "The user with the specified ID does not exist." })
      if (numDel > 0) res.status(200).send(`${numDel} user(s) was deleted `)
    }, 
    reason => {res.status(500).json({error: "The user could not be removed"})});
})

server.put('/api/users/:id', (req,res) => {
  let updateUser = req.body

  if (!updateUser.hasOwnProperty('name') || !updateUser.hasOwnProperty('bio'))
    res.status(400).json({errorMessage: 'Please provide name and bio for the user'}) 
  
  if (updateUser.hasOwnProperty('name') && 
      updateUser.hasOwnProperty('bio') && 
      updateUser.hasOwnProperty('created_at') &&
      updateUser.hasOwnProperty('updated_at')){
    db.update(req.params.id, updateUser)
    .then( user => res.status(200).json(user), 
      reason => {res.status(500).json({ error: "There was an error while saving the user to the database" })});
  }
})
//set which port to listent to and the callback to run after the server starts
server.listen(8001, ()=> console.log('API running on port 8001 ....'))