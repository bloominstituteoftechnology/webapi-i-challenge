// implement your API here


const express = require('express'); // import the express package

const server = express(); // creates the server

const db = require('./data/db.js');


server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res
        .status(500)
        .json({message : "The users information could not be retrieved.", 
                error : err })
    })
 });

 server.get('/api/users/:id', (req, res) => {
     let {id} = req.params;
     
     db.findById(id)
    .then(user => {
        if(user)
            res.status(200).json(user);
        else    
            res
            .status(404)
            .json({message : "The user with the specified ID does not exist."});
    })
    .catch(err => {
        res.status(500)
        .json({message : "The user information could not be retrieved.", 
                error : err })
    })
 });

server.listen(9000, () => console.log("\n server is ALIVE"));


