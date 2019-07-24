const express = require('express');
const Users = require('./data/db.js');
const server = express();


server.use(express.json());


//Server.Get users
server.get('/api/users', (req, res) => {


  res.send('Hello World');
});

//Server.Get id
server.get('/api/users/:id', (req, res) => {


    res.send('Hello World');
  });

//Server.post
server.post('/api/users', (req, res) => {


    res.send('Hello World');
  });
  
//Server.put
server.put('/api/users/:id', (req, res) => {


    res.send('Hello World');
  });

  //Server.delete
server.delete('/api/users/:id', (req, res) => {


    res.send('Hello World');
  });
  
  

server.listen(8000, () => console.log('API running on port 8000'));