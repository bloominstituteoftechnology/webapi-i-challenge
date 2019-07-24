const express = require('express');
const Users = require('./data/db.js');
const server = express();


server.use(express.json());


//Server.Get
server.get('/', (req, res) => {


  res.send('Hello World');
});

//Server.post
server.post('/', (req, res) => {


    res.send('Hello World');
  });
  
//Server.put
server.put('/', (req, res) => {


    res.send('Hello World');
  });

  //Server.delete
server.delete('/', (req, res) => {


    res.send('Hello World');
  });
  
  

server.listen(8000, () => console.log('API running on port 8000'));