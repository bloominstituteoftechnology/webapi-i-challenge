// require the express npm module, needs to be added to the project using "yarn add" or "npm install"
const express = require('express');

const db = require('./data/db');

// creates an express application using the express module
const server = express();

// middleware
server.use(express.json());


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
        }
    ];

    res.status(200).json(hobbits);
})

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.status(500).json({ error: "The users information could not be retrieved." })
        });
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(user => {
            if (user.length === 0) {
                return res.status(404).json({
                    message: "The user with the specified ID does not exist."
                });
            }
            res.json({ user });
        })
        .catch(error => {
            res.status(500).json({ message: "The user with the specified ID does not exist." });
        })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db
        .remove(id)
        .then(removedUser => {
            if (removedUser === 0) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else { 
            res.json(removedUser);
        }
        })
        .catch(error => {
            res.status(500).json({ error: "The user could not be removed" })
        })
});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    if (!changes.name || !changes.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
        return;
    }

    db
        .update(id, changes)
        .then(updatedUser => {
            if (updatedUser === 0) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else {
                res.status(200).json(updatedUser)
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The user information could not be modified." })
        });
        
})

server.post('/api/users', (req, res) => {
    const { name, bio, created_at, updated_at } = req.body;
    // console.log("req body", req.body);
    if (!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
        return;
    }
    db
        .insert({ name, bio, created_at, updated_at })
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the user to the database" });
            return;
        })
});

// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts
server.listen(8000, () => console.log('API running on port 8000'));