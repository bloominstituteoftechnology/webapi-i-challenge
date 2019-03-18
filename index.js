// SET UP AND START SERVER
const express = require('express'); // define server;
const server = express(); // instantiate server;

const db = require ('./data/db.js'); // import db functions;

//  ERROR MESSAGES VARIABLES;  KEEP CODE CLEAN

const noUserList = 'Cannot retrieve list, deal with it';


// ENDPOINTS:








// GET ALL USERS;
server.get('/api/users', (req, res) => {
  db.find().then(users => {
    res.status(200).json(users);
  })
  .catch(err => {
      res.status(501).send(noUserList)
  });
});






server.use(express.json()); // Makes express read JSON format;
const port = 4000; // establish server;




//  set up server to listen for changes
server.listen(port, () => console.log({ message: `=*= Server rolling on port:${port} =*=` }) );
