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
        .catch(err => {
            res.json({ err })
        })
})

server.listen(3333, () => console.log('API running...'));