// implement your API here

//Bring express and create express app
const express = require('express');
const server = express();
const Hub = require('./data/db');

//Config the express app
server.use(express.json());

//Create endpoints with 
server.get('/api/users', (req, res) => {
    Hub.find()
    .then(data => {
        res.status(200).json(data)
    })
})

server.get('/api/users/:id', (req, res) => {

const id = req.params.id
    Hub.findById(id)
    .then(data => {
        res.status(200).json(data)
    })
})
  


server.listen(3000, () => {
    console.log('listening on 3000')
})