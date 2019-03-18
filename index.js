// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();
const port = 5000;

server.get('/', (req, res) => {
  res.send('Hello, I am up!');
});

server.listen(port, () => console.log(`Server is listening at port ${port}`));