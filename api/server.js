const express = require('express');

const accrouters = require('../router/acc_router');

const server = express();

server.use(express.json());

server.use('/api/acc', accrouters);

server.get('/', (req, res) => {
  res.send('<h1> Server Is Alive </h1>');
});

module.exports = server;