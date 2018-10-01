// implement your API here
// how to import or export code between files
// introduce how routing works

// import express from 'express'; // ES2015 modules > export default someCode;
// const express = require('./code/express'); // imports from exact path
const express = require('express'); // CommonJS modules > modules.exports = someCode;
const cors = require('cors');
const db = require('./data/db.js');
const server = express(); // creates the server

server.use(cors()); // this needed to connect from react

server.get('/', (req, res) => {
  // request or route handler function
  res.send('');
});

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      console.log('\n** users **, users');
      res.json(users);
    })
    .catch(err => res.send(err));
});
// watch for traffic in a particular computer port
const port = 8000;
server.listen(port, () =>
  console.log(`\n=== API running on port ${port} ===\n`)
);
