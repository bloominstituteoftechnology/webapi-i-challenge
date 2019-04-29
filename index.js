const express = require('express'); // 1. add express functionality
const db = require('./data/db'); //tells server where to find the database/data

const server = express(); // 2. create an express server call it server

server.use(express.json()); //teaches express how to parse json

server.listen(4000, () => {
  console.log('Server running on localhost: 4000')
});

//create home endpoint 
server.get('/', (req, res) => {
  res.send('Hello World')
});
