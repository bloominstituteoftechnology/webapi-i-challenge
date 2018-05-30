const express = require('express');
const db = require('./data/db');

const port = 5555;
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    // 1st arg: route where a resource can be interacted with
    // 2nd arg: callback to deal with sending responses, and handling incoming
    res.send('Hello from express');
});

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    if (!name || !bio) {
        res.status(400).json({
            error: "Please provide name and bio for the user."
        });
        return;
    };
    db.insert({ name, bio })
        .then(response => {
            res.status(201).send(response);
        })
    .catch(error => {
        res.json({ error: "Please provide name and bio for the user." });
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
                    error: "The user with the specified ID does not exist."
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
                    error: "The user with the specified ID does not exist."
                })
            } else {
                res.json({ user });
            }
        })
        .catch(error => {
            res.status(500).json({
                error: "The user could not be removed"
            });
        });
});

server.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    if ( !name || !bio ) {
        res.status(400).json({
            error: "Please provide name and bio for the user."
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
            res.status(500).send({ error: "The user information could not be modified." });
        });
});

server.listen(port, () => console.log(`Server is running on port ${port}`));