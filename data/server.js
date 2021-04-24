const express = require('express');

const database = require('./db.js');

const server = express();

server.use(express.json());


server.get('/', (req,res) => {
    res.status(200);
    res.send('Welcome To ExpressJS')
});

server.get('/users', (req, res)=>{
    database.find().then(users => {
        console.log(users);
        res.status(200).json(users)
    }).catch(err => {
        res.status(500).json({message: err.message})
    })
})

server.get('/users/:id', (req, res) => {
    const idVar = req.params.id;
    console.log(idVar);
})


module.exports = server;