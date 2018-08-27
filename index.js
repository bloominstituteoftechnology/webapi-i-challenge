const express = require('express');
const db = require('./data/db.js');
const server = express();

server.use(express.json());

//Configure routing
server.get ('/', (req, res) =>{
    res.send('Hello');
});

server.get('/users', (req,res) => {
    db.find()
    .then(users => {
        res.status(200).json(users);
    }) 
    .catch(err => {
        console.error('error', err);
    res.status(500).json({message: 'Error getting data'})
    });
});

server.listen(9000, () => console.log('\n==API on port 9k ==\n'));