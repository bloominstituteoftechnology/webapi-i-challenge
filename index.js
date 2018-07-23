const express = require('express');
const db = require('./data/db.js');

const server = express();

server.get('/api/users', (req, res) => {
  db.find().then(response => {
    // console.log(response)
    res.status(200).json(response)
  }).catch(err => {
    // console.log(err);
    res.status(500).send('Error is:', err);
  });
});

server.listen(8000, () => console.log('App is listening...'));
