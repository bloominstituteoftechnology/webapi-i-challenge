// implement your API here

const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (request, response) => {
  response.send('Hello from our new server!!!');
});

server.listen(4000, () => {
  console.log('Server listening on port 4000.');
});
