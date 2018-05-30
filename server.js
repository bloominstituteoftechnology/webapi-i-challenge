const express = require('express');
const db = require('./data/db');
const cors = require('cors');
const port = 5555;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));
server.get('/', (req, res) =>  {
res.send('hello from express');
})

server.post('/api/users', (req, res) => {
if (req.body.name === undefined || req.body.bio === undefined) {
    res.status(400);
    res.json({ errorMessage: "Please provide name and bio for the user." });
    }

else {
    const { name, bio } = req.body;
    db
    .insert({ name, bio })
    res.status(201)
    .then(response => {
        res.send(response);
    })
    .catch(error => {
        res.status(500);
        res.json({ error: "There was an error while saving the user to the database" });
    })
    }});
    
server.get('/api/users', (req, res) => {
    db
    .find()
    .then(users => {
        res.json({ users });
    })
    .catch(error => {
        res.status(500)
        res.json({ error: "The users information could not be retrieved." });
    })
})
server.get('/api/users/:id', (req, res) => {
const { id } = req.params;
    db
    .findById(id)
    .then(users => {
        if (users.length !== 0) {
        res.json({ users });
        } 
        else {
        res.status(404);
        res.json({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(error => {
        res.status(500);
        res.json({ error: "The user information could not be retrieved."});
    })
})
server.put('/api/users/:id', (req, res) => {
const { name, body } = req.body;
const { id } = req.params;
    db
    .update(req.params.id, req.body)
    .then(users => {
        if (users === 0) {
            res.status(404);
            res.json({ message: "The user with the specified ID does not exist." })
        } 
        else {
            res.json({ users })
        }
    })
    .catch(error => {
        res.status(500)
        res.json({ error: "The user information could not be modified."});
    })
})
server.delete('/api/users/:id', (req, res) => {
const { id } = req.params;
    db
    .remove(id)
    .then(users => {
        if (users === 0) {
            res.status(404);
            res.json({ message: "The user with the specified ID does not exist." })
        } 
        else {
            res.status(200);
            res.json({ users })
        }
    })
    .catch(error => {
        res.status(500)
        res.json({ error: "The user could not be removed" })
    })
})


server.listen(port, () => console.log(`Server running on port ${port}`));