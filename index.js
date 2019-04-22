// implement your API here

const express = require('express'); //import

const db = require('./data/db.js'); //add this line 

const server = express(); //creates express app using express module


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






server.listen(5000, () => {
    console.log('\n*** API running on port 5K ***\n')
})