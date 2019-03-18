// SET UP AND START SERVER
const express = require('express'); // define server;
const server = express(); // instantiate server;

const db = require ('./data/db.js'); // import db functions;

server.use(express.json()); // Makes express read JSON format;


//  ERROR MESSAGES VARIABLES;  KEEP CODE CLEAN

const noUserList = 'Cannot retrieve list, deal with it';
const badFunc = `Somethings broken, I dunno what tho`;
const err404 = `Nobody here by that name`;


// ENDPOINTS:

// GET ALL USERS;
server.get('/api/users', (req, res) => {
  db.find().then(users => {
    res.status(200).json(users);
  })
  .catch(err => {
      res.status(500).send(noUserList)
  });
});

// GET SPECIFIC USER BY ID
server.get('/api/users/:id', (req, res) => {
  const { id } = req.params
  db
  .findById(id).then(user => {
    user.length === 0 ? sendUserError(404, err404, res) : res.json(user);
  })
  .catch(err => res.status(500).json(err404))
});




const port = 4000; // establish server;




//  set up server to listen for changes
server.listen(port, () => console.log({ message: `=*= Server rolling on port:${port} =*=` }) );
