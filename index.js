// require the express npm module, needs to be added to the project using "yarn add" or "npm install"
const express = require('express');
const db = require('./data/db');

// creates an express application using the express module
const port = 8000;
const server = express();
server.use(express.json());

// configures our server to execute a function for every GET request to "/"
// the second argument passed to the .get() method is the "Route Handler Function"
// the route handler function will run on every GET request to "/"
server.get('/', (req, res) => {
  // express will pass the request and response objects to this function
  // the .send() on the response object can be used to send a response to the client
  res.send('Hello World <br><h1>this is Express mini</h1>');
});


server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    if (!name || !bio) {
        res.status(400).json({
            error: "post: Please provide name and bio for the user."
        });
        return;
    };
    db.insert({ name, bio })
        .then(response => {
            res.status(201).send(response);
        })
    .catch(error => {
        res.json({ error: "insert: Please provide name and bio for the user." });
    });
});

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error: "The users information could not be retrieved." });
        });
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params; // pull id off of req.params;
    db.findById(id) // invoke proper db.method(id) passing it the id.
        .then(user => { // handle the promise like
            if (user === 0) {
                res.status(404).json({
                    error: "findById: The user with the specified ID does not exist."
                })
            } else {
                res.json({ user });
            }
        })
        .catch(error => {
            res.json({ error: "The user with the specified ID does not exist." });
        });
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(user => {
            if (user === 0) {
                res.status(404).json({
                    error: "remove: The user with the specified ID does not exist."
                })
            } else {
                res.json({ user });
            }
        })
        .catch(error => {
            res.status(500).json({
                error: "delete: The user could not be removed"
            });
        });
});

server.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    if ( !name || !bio ) {
        res.status(400).json({
            error: "update: Please provide name and bio for the user."
        });
        return;
    }
    db.update(id, { name, bio })
        .then(user => {
            if (user === 0) {
                res.status(404).json({
                    error: "The user with the specified ID does not exist."
                })
                return;
            } else {
                res.json({ user });
            }
        })
        .catch(error => {
            res.status(500).send({ error: "update: The user information could not be modified." });
        });
});
// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts

//server.listen(8000, () => console.log('API running on port 8000'));
server.listen(port, () => console.log(`Server is running on port ${port}`));