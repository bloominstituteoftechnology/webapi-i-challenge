// implement your API here
const express = require("express");

const greeter = require('./greeter.js')
const server = express();
const db = require('./data/db')
server.listen(5000, () => 
console.log("Server is running on http://localhost:9000"));

server.get("/", (req,res) => {
    res.json("Hello there");
});

server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500)
        .json({message: "we failed getting users", error: error})
    })
})

server.get('/api/users/:id', (req,res) => {
    const {id} = req.params;

    db.findById(id).then(user => {
        if(user) {
        res.status(200).json(user);
        } else {
            res.status(404).json({message: "The user with the specified ID does not exist."})
        }
    }).catch(error => {
        res.status(500)
        .json({error: "The users information could not be retrieved.", error: error})
    })
})

server.delete('/api/users/:id', (req,res) => {
    const {id} = req.params;

    db.remove(id).then(user => {
        if(!user) {
            res.status(404).json({message:"The user with the specified ID does not exist."})
        }
    })
    .catch(error => {
        res.status(500)
        .json({error: "The user could not be removed"})
    })
})

server.put('/api/users', (req,res) => {
    db.insert({name: 'bob', bio: 'Im bob the builder'}).then(user => {
        res.status(201).json({url: '/hobbits', operation: 'POST'})
    })
    .catch(error => {
        res.status(500)
        .json({error: "The user could not be removed"})
    })
})
server.get('/greet/:person', greeter);