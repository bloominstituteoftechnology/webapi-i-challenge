const express = require('express');

const accrouter = require('../router/acc_router');

const server = express();

server.use(express.json());

server.use('/api', accrouter);

server.get('/', (req, res) => {
  res.send('<h1> Server Is Alive </h1>');
});

module.exports = server;