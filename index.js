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
        res.status(500).json({ error: "The users information could not be retrieved." })
    })
  
})

server.get('/api/users/:id', (req, res)=> {
    console.log('req: ', req.params);
    const id = req.params.id
    db.findById(id).then(item => {
        if(item.length === 0) {
            res.status(404).json({ error: "The user with the specified ID does not exist." })
        }
        res.status(200).json(item)
    })
    .catch(err => { 
        res.status(500).json({ error: "The user with the specified ID does not exist." })
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