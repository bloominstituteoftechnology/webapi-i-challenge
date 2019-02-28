// implement your API here

const express = require('express');

const db = require('./data/db');

const server = express();
const PORT = '9090';


// parses the body and adds it to req.body
server.use(express.json()); // important to have


// endpoints
server.get('/api/users', (req, res) => {
    const name = req.params.name;
    db.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).json({ err: 'The users information could not be retrieved.'});
    })
});

server.get('/api/users/:id', (req, res) => {
    // gets a specific user by the id 
    // send an error message if the id is invalid

    const { id } = req.params;

    db.findById(id) 
    .then(user => {
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({err: 'The user with the specified ID does not exist'});
        }
    })
    .catch(err => {
        res.status(500).json({message: 'The user information could not be retrieved.'});
    })
});

server.post('/', (req, res) => { // creates a new user with a unique ID in the database
    // insert a user with a unique ID into the database
    // else send an error message that says Please provide name and bio for the user with a 400 request if the bio or name is missing 
});

server.delete('/', (req, res) => {  // deletes a user by a specified ID from the database

});

server.put('/api/users/:id', (req, res) => { // updates any information for the user with the specified ID
// check if ID is valid within the database
// if ID is valid perform an update on the information that you enter 
// else send back a 404 error with the message The user with the specified ID does not exist
// if there is an error updating the user send a 400 error with the message Please provide name and bio for the user
})

// should be last in the codebase
server.listen(PORT, () => {
    console.log(`Our Server is listenning on port ${PORT}`);
  });