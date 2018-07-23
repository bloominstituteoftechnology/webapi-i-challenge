const express = require('express');
const port = 8000;
const helmet = require('helmet');
const server = express();
const db = require('./data/db');

//add middleware
server.use(helmet());

server.get('/', (req, res)=> {
    res.send({  hello : 'world' })
})

server.get('/api/users', (req, res)=> {
    db.find().then(item => {
         res.status(200).json(item)
    })
    .catch(err => { 
        res.status(500).send(err)
    })
  
})

server.get('/hobbits', (req, res) => {
    // route handler code here
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

      res.status(200).json(hobbits)
  });

server.listen(port, () => console.log('Server is running'));