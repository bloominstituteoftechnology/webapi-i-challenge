const db = require('./data/db');
const express = require('express');
const bodyParser = require('body-parser')

const server = express();
server.use(bodyParser.json());



server.post('/api/users', (req, res) => {
    
    
    if(req.body.name === undefined || req.body.bio === undefined) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user."});
        return res.end();
    }
    
    db.insert(req.body)
    .then(response => {
       
        res.status(201).send(response)
    })
    .catch(() => {
        res.status(500).json({ error: "There was an error while saving the user to the database"});
        res.end();
    })
});


server.get('/api/users', (req, res) => {
    db.find()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(() =>{
        res.status(500).json({ error: "The user information could not be retreived."});
        res.end();
    })
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id)
    .then(response => {
        if(response.length === 0) {
        res.status(404);
        res.json({ message: 'The user with the specified ID does not exist.'});
        return;
        }
        res.status(200).send(response);
    })
    .catch(() => {
        res.json({ message: 'The user with the specified ID does not exist.'});
    })
})


server.listen(8000);