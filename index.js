const express = require('express');
const data = require('./data/db');

const server = express();

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.get('/hobbits', (req, res) => {
  const hobbits = [
    {
      id: 1,
      name: 'Samwise Gangee',
    },
    {
      id: 2,
      name: 'Frodo Baggins',
    }
  ];

  res.status(200).json(hobbits);
});
