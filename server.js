const express = require('express'); // how we import the express server
const db = require('./data/db');

const server = express(); // create a server by calling the express function that automatically 
                          // creates a server for us
server.listen(5000, () => { // we now use that server to listen to a certain port
    console.log(' === APP running on port 5000 === '); // any requests that come in...
}) // the server can listen for those requests and handle them as we write code for it


// here is the code for a simple get request
// a get request takes the address or the end point and a callback as parameters
// that callback will always take at least two parameters => reques and response req & res homies
server.get('/', (req, res) => {
res.send('<h2>GET REQUEST RECIEVED</h2>');
})

server.get('/api/users', (req, res) => {
    db.find();
      .then( users => {
          res.status(200).json({users});
      })
      .catch( err => {
          res.status(500).json({error: 'PROBLEM WITH RETRIEVING DATA'});
      })
})

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    db.findById(userId)
      .then( user => {
          res.json({ user });
      })
      .catch( err => {
          res.status(500).json({ error: 'PROBLEM WITH RETRIEVING DATA' });
      })
})