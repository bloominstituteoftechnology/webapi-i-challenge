const express = require('express')
const cors = require('cors');
const db = require('./data/db')
const port = 5555;
const server = express();
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    // 1st argument: route where a resource can be interacted with 
    // 2nd argument: callback to deal with sending responses, and handling incoming data
    res.send('Hello from express');
});

server.post('/api/users/', (req, res) => {
    const { name, bio } = req.body;

    if (!name || !bio) {
        res.status(400);
        res.json({ errorMessage: "Please provide name and bio for the user." });
        return;
    }

    db.insert({ name, bio })
        .then(response => {
            res.status(201);
            res.json(response);
        })
        .catch(error => {
            res.status(500);
            res.json({ error: "There was an error while saving the user to the database." });
        });
});

server.get('/api/users/', (req, res) => {
    db.find()
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.status(500);
            res.json({ error: "The users information could not be retrieved." });
        })
});

server.get('/api/users/:id', (req, res) => {
    // pull id off of req.params; 
    // invoke proper db.method(id) passing it the id. 
    // handle the promise like above

    const { id } = req.params;

    db.findById(id)
        .then(response => {
            if (!response) {
                res.status(404);
                res.json({ message: "The user with the specified ID does not exist." });
            }
            else {
                res.json(response);
            }
        })
        .catch(error => {
            res.status(500);
            res.json({ error: "The user information could not be retrieved." });
        })
})

server.delete('/api/users/:id', (req, res) => {

    const { id } = req.params;

    db.remove(id)
        .then(response => {
            if (!response) {
                res.status(404);
                res.json({ message: "The user with the specified ID does not exist." });
            }
            else {
                res.json(response);
            }
        })
        .catch(error => {
            res.status(500);
            res.json({ error: "The user could not be removed." });
        })
})

server.put('/api/users/:id', (req, res) => {

    const { id } = req.params;

    const { name, bio } = req.body;


    if (!name || !bio) {
        res.status(400);
        res.json({ errorMessage: "Please provide name and bio for the user." });
        return;
    }

    db.update(id)
        .then(response => {
            if (!response) {
                res.status(404);
                res.json({ message: "The user with the specified ID does not exist." })
            }
            else {
                res.status(200);
                res.json(response);
            }
        })
        .catch(error => {
            res.status(500);
            res.json({ error: "The user information could not be modified." });
        })
})

server.listen(port, () => console.log(`Server running on port ${port}`)); 
