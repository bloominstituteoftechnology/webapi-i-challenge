const express = require('express'); //CommonJs Modules
// Same as import express from 'express; //ES2015 Modules

const db = require('./data/db.js');

const server = express();

// normally where middleware is configured
server.use(express.json());

// normally where routing is configured (routing is also a form of middleware)
server.get('/', (req,res) => { // req = REQUEST res = RESPONSE
res.send('Hello FSW12');
});


server.get('/users', (req ,res) => {
 db.find()
 .then(users => {
     res.status(200).json(users);
 })
 .catch(err => {
     console.error('error',err);

     res.status(500).json({ message:'Error getting the data' });
 });
})

// start the server
server.listen(9000, () => console.log('\n== API on port 9k ==\n'));

