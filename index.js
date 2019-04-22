// implement your API here
const express = require('express'); // import the express package

const db = require('./data/db.js'); // import data helpers

const port = 5000;  // specify the port to listen on

const server = express(); // creates the server

// handle request to the root of the api, the '/' route
server.get('/', (req, res) => {
  res.send('Howdy from Users API // by: x-zen');
});

// watch for connections on specified port
server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
