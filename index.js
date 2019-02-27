// implement your API here

const express = require('express');

const db = require('./data/db');

const server = express();
const PORT = '9090';


// parses the body and adds it to req.body
server.use(express.json()); // important to have

server.get('/api/users', (req, res) => {
    const name = req.params.name;

    //express will pass the request and response objects to this function 
    // the .send() on response object can be used to send a response to the client
    db.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).json({ err: 'User not found in the database'});
    })
});




// should be last in the codebase
server.listen(PORT, () => {
    console.log(`Our Server is listenning on port ${PORT}`);
  });