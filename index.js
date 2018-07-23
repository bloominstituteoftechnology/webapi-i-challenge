// import express from 'express'; // ES Modules
const express = require('express'); // CommonJS
const helmet = require('helmet');
const db = require('./data/db')

const server = express();
// add middleware
server.use(helmet());

// configure routing/endpoints
server.post('/api/users', (req,res) => {
    const { name, bio } = req.body;
    db
    .insert({ name, bio })
    .then(response => {
        console.log(response);
        res.send(response);
    })
    .catch(error => {
        res.json(error);
    });
});

server.get('/', (req, res) => {
    res.send("Hello World");
});

server.get('/api/users/', (req, res) => {
    db
    .find()
    .then(users => {
        res.json({users})
    })
    .catch(error => {
        res.json({error});
    })
});



// the get is synchronous, but the contents of the get can be a promise to be asynchronous
// first is a name (aka a path)
// the homies are the request and the response (they are homies because they always go together)

server.listen(8000, () => console.log('API running . . .'));
