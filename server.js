const express = require('express');
const db = require('./data/db');

const server = express();

server.listen(5000, () => {
    console.log(' === APP running on port 5000 === ');
})

server.get('/', (req, res) => {
res.send('<h2>GET REQUEST RECIEVED</h2>');
})

server.get('/api/users', (req, res) => {
    db.find();
      .then( users => {
          res.status(200).json({users});
      })
      .catch( err => {
          res.status(500).json({error: 'PROBLEM WITH RETREIVING DATA'});
      })
})

