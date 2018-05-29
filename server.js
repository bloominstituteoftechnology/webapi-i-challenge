const express = require('express');
const db = require('./data/db');

const port = 5555;
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello from express');
});

// server.post('/api/users', (req, res) => {
//     const { name, bio } = req.body;
//     console.log(db.insert({ name, bio });
// });
server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    if (!name || !bio){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
        return;
    }
    
    db.insert({ name, bio})
    .then(response =>{   
        res.status(201).send(response);
    })
    .catch(error => {
        res.status(500).json({error: "There was an error while saving the user to the database"});
    })
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
});
server.get('/api/users/:id', (req, res) => {
    db
    .findById(req.params.id)
    .then(response => {
        if(response.length === 0){
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        } else {
            res.status(200).json(response[0]);
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The user information could not be retrieved." });
    })
});
server.delete('/api/users/:id', (req, res) => {
    db
    .remove(req.params.id)
    .then(response => {
        if (response === 0){
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        } else {
            res.status(200).json(response[0]);
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The user could not be removed" });
    })
});
server.put('/api/users/:id', (req, res) => {
    const {name, bio} = req.body
    const id = req.params
    console.log(id)
    db
    .update(id, {name, bio})
    .then(response => {
        res.json({user});
    })
    .catch(message => {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    });
});

server.listen(port, () => console.log(`Server running on port ${port}`));
