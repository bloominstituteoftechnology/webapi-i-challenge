const express = require('express');
const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.listen(5000, () => {
    console.log('API up and running on port 5000')
  })
  