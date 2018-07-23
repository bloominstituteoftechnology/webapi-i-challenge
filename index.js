const express = require('express');
const db = require('./data/db.js');


const server = express();

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.get('/hobbits', (req, res) => {
  const hobbits = [
    {
      id: 1,
      name: 'Samwise Gamgee',
    },
    {
      id: 2,
      name: 'Frodo Baggins',
    },
  ];

  

  res.status(200).json(hobbits);
});
server.get('/userss', (req, res) => {
    const userss = [
      {
        id: 1,
        name: 'User1',
      },
      
      {
        id: 3,
        name: 'User3',
      },
    ];
    res.status(200).json(userss);
});
server.get('/api/users', (req,res) => {
    const users=[
    function find() {
        return db('users');
      }
    ]
      res.status(200).json(users);
   
});
server.listen(8000, () => console.log('API running on port 8000'));