// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();
const parser = express.json();
const PORT = '9090';

server.use(parser);

//test
server.get('/', (req, res) => {
    res.send('Hello World');
  });

//GET	/api/users	Returns an array of all the user objects contained in the database.
server.get('/api/users', (req, res) => {
    .then(() => {

    })
    .catch(() => {

    })
})

//GET	/api/users/:id	Returns the user object with the specified id.
server.get('/api/users/:id', (req, res) => {
    .then(() => {

    })
    .catch(() => {
        
    })
})

//DELETE	/api/users/:id	Removes the user with the specified id and returns the deleted user.
server.delete('/api/users/:id', (req, res) => {
    .then(() => {

    })
    .catch(() => {
        
    })
})

//POST	/api/users	Creates a user using the information sent inside the request body.
server.post('/api/users', (req, res) => {
    .then(() => {

    })
    .catch(() => {
        
    })
})

//PUT	/api/users/:id	Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.
server.put('/api/users/:id', (req, res) => {
    .then(() => {

    })
    .catch(() => {
        
    })
})




server.listen(PORT, () => {
    console.log(`Our server is listening on port ${PORT}`);
  });