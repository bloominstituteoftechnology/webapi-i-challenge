
// require the express npm module, needs to be added to the project using "yarn add" or "npm install"
const express = require('express');
const helmet = require('helmet');
const db = require('./data/db');

// creates an express application using the express module
const port = 3001;
const server = express();
server.use(helmet());
server.use(express.json());

let nextId = 3;
// configures our server to execute a function for every GET request to "/"
// the second argument passed to the .get() method is the "Route Handler Function"
// the route handler function will run on every GET request to "/"
server.get('/', (req, res) => {
    res.send('Hello World');
});

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
    })
        .catch(err => res.status(500).json({ message: "Error"}));
});

  // express will pass the request and response objects to this function
  // the .send() on the response object can be used to send a response to the client

server.post('/api/users', (req, res) => {
    const user = { id: nextId++, ...req.body }
    users.push(user);
    res.status(200).json(users);
});

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    const format = req.query.format || 's';

    // update user
    res.status(200).json(users);
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users = users.filter(u => u.id != id);
    res.status(200).json(users);
})
// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts
server.get('/api/users', (req, res) => {
    const sortField = req.query.sortby || 'id';
    
    res.status(200).json(users);
})

/* server.post('/api/users', (req, res) => {
    if (!name || !body) {
        sendUserError(400, 'Please provide name and bio for the user.', res);
        return;
    }
}) */