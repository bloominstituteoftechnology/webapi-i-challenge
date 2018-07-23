// require the express npm module, needs to be added to the project using "yarn add" or "npm install"
const express = require('express');
const db = require('./data/db.js');

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

server.get('/users', (req, res) => {
    return db
    .find()
    .then(result => {
        res.json(result);
    })
    .catch(() => {
        res.status(500).send({ error: "The users information could not be retrieved." })
    })
})

server.post('/users', (req, res) => {
    const { name, bio } = req.body;
    if(!name || !bio){
        res.status(400).send({ errorMessage: "Please provide name and bio for the user." })
    }
    return db
    .insert({
        name: name,
        bio: bio,
        // created_at: Date.now(),
        // updated_at: Date.now()
    })
    .then(user => {
        res.status(201).send(user)
    })
    .error(err => {
        res.status(500).send(err)
    })
})


// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts
server.listen(8000, () => console.log('API running on port 8000'));