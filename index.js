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

server.post('/', (req, res) => {

})

server.delete('/', (req, res) => {
    
})



// should be last in the codebase
server.listen(PORT, () => {
    console.log(`Our Server is listenning on port ${PORT}`);
  });