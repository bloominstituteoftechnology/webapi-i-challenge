const db = require('./data/db');
const express = require('express');
const bodyParser = require('body-parser')

const server = express();
server.use(bodyParser.json());



server.post('/api/users', (req, res) => {
    console.log(req.body)
    
    
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

