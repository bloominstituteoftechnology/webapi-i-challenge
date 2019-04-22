// implement your API here

const express = require('express'); //import

const db = require('./data/db.js'); //add this line 

const server = express(); //creates express app using express module

server.use(express.json()); //add this fro POST 

//GET REQUEST IS WORKING 
server.get('/', (req, res) => {
    res.send('Get request is working')
});

//GET USERS /api/users
server.get('/api/users', (req, res) => {
    db  //doesn't need a .name b/c it doesn't have one 
      .find()
      .then(users => {
          res.status(200).json(users);
      })
      .catch(err => {
          res.status(500).json({ error: err, message:  "The users information could not be retrieved."})
      })
})

//GET REQUEST FOR /api/users/:id
server.get('/api/users/:id', (req, res) => {
    db 
    .findById()
    ,then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(404).json({ error: err, message: "The user information could not be retrieved."})
    })
})



//POST REQUEST for /api/users
server.post('/api/users', (req, res) => {
    const userInformation = req.body;
    console.log('request body:', userInformation);

    db
    .insert(userInformation)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(err => {
        res.status(400).json({ error: err, message: "Please provide name and bio for the user."})
    });
});

//








server.listen(5000, () => {
    console.log('\n*** API running on port 5K ***\n')
})