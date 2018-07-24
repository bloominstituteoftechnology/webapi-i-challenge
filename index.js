//import express from 'express'; //ES Modules

const express = require('express'); //CommonJs
const helmet = require('helmet');
const db = require('./data/db');
const server = express();



server.use(express.json());

// add middleware
server.use(helmet()); 

// configure routing/endpoints

server.get('/', (req, res) => {
    res.send('<h1>Hello World</h1  >');
    //res.send({ hello: 'world' });
})

server.get('/api/users', (req, res) => {

    const { user } = req.body

    db
        .find()
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.status(500).json({ error: 'The users information could not be retrieved.' })
            return;
        })
})
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id ;
    db
        .findById(id)
        .then(users => {
            if (users.length === 0) {
                res.status(404).json({ message: 'The user with the specified ID does not exist.' })
            }
            res.json({ users })
        })
        .catch(error => {
            res.status(500).json({ error: 'The user information could not be retrieved.' })
            return;
        })

})

//data shape
// {
//     users: [
//     {
//     id: 1,
//     name: "AtokiBot",
//     bio: "CS8 Student at Lambda School",
//     created_at: "2018-04-02 19:01:14",
//     updated_at: "2018-04-02 19:01:14"
//     },
//     {
//     id: 2,
//     name: "GeekBot",
//     bio: "CS8 Student at Lambda School",
//     created_at: "2018-04-02 19:01:14",
//     updated_at: "2018-04-02 19:01:14"
//     }
//     ]
//     }
server.listen(3333, () => console.log('API running...'));