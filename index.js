// implement your API here
// how to import / export code between files
// introduce how routing works

// import express from 'express'; // ES2015
const express = require('express'); // CommonJS modules > module.exports = someCode;
const cors = require('cors');// install this package to react

const db = require('./data/db.js');

const server = express(); // creates the server

server.use(cors()); // this needed to connect form react


server.get('/', (req, res) =>{// request/route handler
    res.send('<h1>Hello FSW13!</h1>');
});

server.get('/api/users', (req, res) =>{
    db.find()
    .then(users =>{
     console.log('\n** users **', users);
     res.json(users);   
    })
    .catch(err => res.send(err));
});

// watch for traffic in a particular computer port
const port = 5000;
server.listen (port, () => 
console.log(`\n=== API running on port ${port} ===\n`)
);

// http://localhost:3000 > the 3000 is the port.
// 80: http, 443: https, 25: email servers 
