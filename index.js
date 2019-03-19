// SET UP AND START SERVER
const express = require('express'); // define server;
const server = express(); // instantiate server;

const port = 4000; //
const db = require ('./data/db.js'); // import db functions;

server.use(express.json()); // Makes express read JSON format;


//  ERROR MESSAGE VARIABLES;  KEEP CODE CLEAN

const noUser = `Nobody here by that name`;
const noUserList = 'Cannot retrieve list, deal with it';
const badFunc = `Somethings broken`;
const del = `User deleted. Nobody liked that guy anyway`;
const delErr = `DELETE FAIL. yeah, that person isn't going anywhere and now they know you tried to get rid of them`;
const missInfo = `Not getting into this database without a name & bio`;
const userAdd = `One of us, new user added`;
const updateName = `Name field updated`;
const updateBio = 'Bio field updated';
const updateBoth = `Name & Bio updated`;


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
  user.length === 0 ? sendUserError(404, noUser, res) : res.json(user);
  const { id } = req.params
  .catch(err => res.status(500).json(badFunc))
  db.findById(id).then(user => {
  })
});


// POST ENDPOINT
server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    sendUserError(400, missInfo, res);
    return;
  }
    db.insert({name, bio}).then(user => res.status(201).json(userAdd))
    .catch(err => res.status(501).json(missInfo))
});

// DELETE ENDPOINT
server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id).then(user => {
    res.status(200).json(del)
  .catch(err => res.status(500).json(delErr))
  });
});






//  set up server to listen for changes
server.listen(port, () => console.log({ message: `=*= Server rolling on port:${port} =*=` }) );
