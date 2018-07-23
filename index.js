const express = require('express');
const server = express();
const db = require('./data.db');

server.get('/', (req, res) => {
  res.send(find());
});

server.get('/api/users', (req, res) => {
  const users = [
    {
      id: 1,
      name: 'Samwise Gamgee',
    },
    {
      id: 2,
      name: 'Frodo Baggins',
    },
  ];
  res.send(users);
});

server.listen(8000, () => console.log('API Running...'));
