// implement your API here
const express = require('express');
const db = require('./data/db')

const server = express();

server.use(express.json());

server.post('/users',(req, res) => {
    const {name , bio} = req.body;

    db.insert(name && bio)
    .then(user => {
        if(user !== user.name && user.bio) {
            res.status(400).json({errorMessage: "Please provide name and bio for the user."})
        }else {
            res.status(201).json({success: true, user})
        }
    })
    .catch(err => {
        res.status(500).json({error: "There was an error while saving the user to the database", err})
    })
})

server.get('/users',(req,res) => {
    db.find()
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json({error: "The users information could not be retrieved.", err})
    })
});

server.get('/users/:id',(req, res) => {
    db.find()
    .then(user => {
        if(user != user.id) {
            res.status(404).json({message: "The user with teh specified ID does not exist."})
        }else {
            res.status(500).json({error: "The user information could not be retrieved."})
        }
    })
    .catch(err => {
        res.status(500).json({success:false, err})
    })
})

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;

    db.remove(id)
    .then(deleted => {
        if(user !== user.id) {
            res.status(404).json({message: "The user with the specified ID does not exist.", deleted})
        }
    })
    .catch(err => {
        res.status(500).json({error: "The user could not be removed", err})
    })
})

server.put('/users/:id', (req,res)=> {
    const {id} = req.params;
    const {name, bio} = req.body;

    db.update(id, name, bio)
    .then(updated => {
        if(updated !== user.id) {
            res.status(404).json({message: "The user with the specified ID does not exist."})
        }else {
            res.status(400).json({errorMessage: "Please provide name and bio for the user."})
        }
    })
    .catch(err => {
        res.status(500).json({error: "The user information could not be modified.", err})
    })
})

server.listen(4000, () => {
    console.log('server listening on port 4000');
})