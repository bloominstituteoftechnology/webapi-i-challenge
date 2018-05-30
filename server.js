const express = require('express');
const db = require('./data/db');

const port = 5555;
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    //1st arg: route where a resource can be interacted with
    //2nd arg: cb to deal with sending res and handling incoming.
    res.send('Hello from express');
});

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    if(!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        return;
    }
    db
        .insert({ name, bio })
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the user to the database" });
        });
});

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.status(500).json({ error: "The users information could not be retrieved." });
        });
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db
        .findById(id)
        .then(users => {
            res.json({ users })
        })
        .catch(error => {
            res.json(error);
        })
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db
        .remove(id)
        .then(users => {
            res.json({ users })
        })
        .catch(error => {
            res.json(error);
        })
})

server.put('/api/users/:id', (req, res) => {
    const { name, bio } = req.body;
    const id = req.params.id;
    db
        .update(id, { name, bio })
        .then(count => {
            res.json(count)
        })
        .catch(error => {
            res.json(error);
        })

})


server.listen(port, () => console.log(`Server running on port ${port}`));