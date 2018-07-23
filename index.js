const express = require('express');
const db = require('./data/db');
const port = 8000;
const server = express();
server.use(express.json());

// server.get('/', (req, res) => {
//     res.send('Hello World!') 
// });

server.get('/:id', (req, res) => {
    const { id } = req.params;
  
    res.send('Hello World!');
  });
server.listen(8000, () => console.log('API running...'));