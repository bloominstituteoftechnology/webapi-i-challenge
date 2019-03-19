// SET UP AND START SERVER
const express = require('express'); // define server;
const server = express(); // instantiate server;

const db = require ('./data/db.js'); // import db functions;

server.use(express.json()); // Makes express read JSON format;


//  ERROR MESSAGES VARIABLES;  KEEP CODE CLEAN

const noUserList = 'Cannot retrieve list, deal with it';
const badFunc = `Somethings broken`;
const err404 = `Nobody here by that name`;
const del = `User deleted. Nobody liked that guy anyway`;
const delErr = `DELETE FAIL. yeah, he's not going anywhere`;
const miss = `Not getting into this database without a name & bio`;
const userAdd = `One of us now, new user added`;


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
  db.findById(id).then(user => {
    user.length === 0 ? sendUserError(404, err404, res) : res.json(user);
  })
  .catch(err => res.status(500).json(err404))
});


// POST ENDPOINT
server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    sendUserError(400, miss, res);
    return;
  }
    db.insert({name, bio}).then(user => res.status(201).json(userAdd))
    .catch(err => res.status(501).json(miss))
});


const port = 4000; // establish server;




//  set up server to listen for changes
server.listen(port, () => console.log({ message: `=*= Server rolling on port:${port} =*=` }) );
