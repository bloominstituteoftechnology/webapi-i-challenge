// implement your API here

//Bring express and create express app
const express = require('express');
const server = express();
const Hub = require('./data/db');

//Config the express app
server.use(express.json());

//Create endpoints
server.get('/api/users', (req, res) => {
    Hub.find()
    .then(data => {
        console.log('happy');
        res.status(200).json(data)
    })
})
  


server.listen(3000, () => {
    console.log('listening on 3000')
})