const express = require('express');

const Users = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req,res) => {
    res.send('Hello World!')
});

///CRUD Receive

server.get('/users', (req, res) => {
    Users.find().then(users => {
        res.status(200).json(users);
    }).catch(error => {
        res.status(500).json(error)
    })
});

server.get('/users/:id', (req, res) => {
    
    const { id } = req.params;

    Users.findById(id).then(user => {
        console.log(user)
        res.status(200).json(user);
    }).catch(() => {
        res.status(500).json({ error: "The users information could not be retrieved." })
    })
});

///CRUD Create

server.post('/users', (req, res) => {
    const newUser = req.body;
    if(newUser.bio && newUser.name) {
    Users.insert(newUser)
    .then(user => { 
        res.status(201).json(newUser);
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the user to the database" });
    })
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
})

///CRUD Delete

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    Users.remove(id).then(deleted => {
        if(deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
        .catch(() => {
            res.status(500).json({ error: "The user could not be removed" });
        });
})

///CRUD Update

server.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;

    if (updatedUser.bio && updatedUser.name) {
    Users.update(id, updatedUser).then(updated => {
        if (updated) {
            res.status(200).json(updated);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
        .catch(() => {
            res.status(500).json({ error: "The user information could not be modified." });
        });
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
});

const port = 5000;

server.listen(port, () => console.log(`running on port ${port}`))