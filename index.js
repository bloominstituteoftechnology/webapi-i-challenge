// require the express npm module, needs to be added to the project using "yarn add" or "npm install"
const express = require('express');
const database = require('./data/db');

// creates an express application using the express module
const server = express();

// configures our server to execute a function for every GET request to "/"
// the second argument passed to the .get() method is the "Route Handler Function"
// the route handler function will run on every GET request to "/"
server.get('/', (req, res) => {
  // express will pass the request and response objects to this function
  // the .send() on the response object can be used to send a response to the client
  res.send('Hello World');
});

server.get('/hobbits',(req, res) => {
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
})

server.get('/api/users', (req, res) =>{
    database.find().then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({error: 'There was an error in retrieving the information'});
    })
});

// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts
server.listen(8000, () => console.log('API running on port 8000'));