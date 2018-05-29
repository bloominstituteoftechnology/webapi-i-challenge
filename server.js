const express = require('express');
const db = require('./data/db');

const port = 5000;
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    //1st arg: route where a resource can be interactive with
    //2nd arg: callback to deal with sending responses, and handling incoming
    res.send ('Hello from express')
});

server.post('/api/users/', (req, res) => {
    const { name, bio } = req.body;
    if( !name || !bio ){
        res.status(400).json(`{ errorMessage: "Please provide name and bio for the user." }`).end();
    }else {
        db
        .insert({ name, bio })
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            res.json(error)
        });
    };
});

server.get('/api/users', (req, res) => {
    db
    .find()
    .then(users => {
        res.json({ users });
    })
    .catch(error =>{
     res.status(500).json(error)
    })
});

server.get('/api/users/:id', (req, res) =>{
    const id = req.params.id
    db
    .findById(id)
    .then(users => {
        if(users.length === 0){
            return res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
        res.status(200).json( users );
    })
    .catch(error => {
        res.status(500).json({ error: "The user information could not be retrieved."});
    })
});

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db
    .remove(id)
    .then(users => {
        if(user.length === 0){
            return res.status(404).json({ message:  "The user with the specified ID does not exist." })
        }
        res.status(200).json( users )
    })
    .catch(error => {
        res.status(500).json({error: "The user could not be removed"})
    })
});

server.put('/api/users/:id', (req, res) => {
    const id    = req.params.id;
    const users = {name: req.body.name, bio: req.body.bio}
    db
    .update(id, users)
    .then(users => {
        if( !users ) {
            return res.status(404).json({message: "The user with the specified ID does not exist." })
        }
        if( !req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('body')) {
            return res.status(400).json({errorMessage: "Please provide name and bio for the user."})
        }
        res.status(200).json( users )
    })
    .catch(error => {
        res.status(500).json({ error: "The user information could not be modified." })
    })
});

server.listen(port, () => console.log(`Server running on port ${port}`));
