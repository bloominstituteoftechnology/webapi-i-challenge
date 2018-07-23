const express = require('express');
const port = 8000;
const helmet = require('helmet');
const server = express();
const db = require('./data/db');

//add middleware
server.use(helmet());
server.use(express.json)

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
    // console.log('req: ', req.params);
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

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    // console.log(db.insert({ name, bio }))
    if ( !name || !bio ) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." }) 
        return;
    }
    db
     .insert({ name, bio })
     .then(item  => {
         res.status(201).json(item);
     })
     .catch(error => {
         res.status(500).json({ error: "There was an error while saving the user to the database" }) 
     })
 });
 
 server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    db.remove(id).then(item => {
        if(!item) {
           return  res.status(404).json({ error: "The user with the specified ID does not exist." })
        }
        res.status(200).json(item)
    })
    .catch(err => { 
        res.status(500).json({ error: "The user could not be removed" })
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