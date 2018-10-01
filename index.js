// implement your API here
// how to import between files
//introduce how routing works
//import express from 'express' // es2015 way // and export   export default express
const express = require ('express'); // module.exports = 'some code';
const db = require('./data/db');
const cors = require('cors');// install this to connect to react;
const server = express(); // creates server;

server.use(cors());// this needed to connect from react

server.get('/', (req, res) => {
  res.send('<h1>Hellow FSW13!</h1>')
})

server.get('/api/users', (req, res) => {
  db.find().then(users => {
    res.json(users);
  })
  .catch(err => res.send(err));
  })

// like an adress for servers to run and listen to traffic from network;
//  watch for traffic in a particular computer port
// many ports are standard
// port 80 http ; https uses port 443  (encrypted)
// port 25 used for email servers;
// port 3000 = react
// ports for 3001 + are for users; open ports;

// we need to assign our server a port;
// npm run server or yarn server or yarn start?
const port = 9000;
server.listen(port, () => console.log(`==API running on port ${port}===`));
