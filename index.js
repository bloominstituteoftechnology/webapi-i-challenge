//requiring express sets up the ability to use the express function
const express = require('express');

// express() is a function with methods for server building
const server = express();
const db = require('./data/db')
const PORT = 4000

/*
 get() wants to know endpoint and then callback the call back need a request and response param. Res can send html, string, arrays, objects. Any real JS object really. json() is used when responding with json data. status() needs to be kept in mind when sending responses in case you need to use someting other than 200.
endpoints
*/
/*server.get('/greet/:name', (req, res) => {
    const name = req.params.name
    res.send(`Suh ${name}`);
});*/

server.get('/api/users', (req, res) => {
       db.find()
         .then((users) => {
           res
            .json(users)
       })
         .catch(err => {
           res
             .status(500)
             .json({message: "Failed to get users"});
       });
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
          db.findById(id)
            .then(user => {
              if (user) {
                res.json(user) 
              } else {
                res.status(404).json({ message: "User does not exist"});
              }
              
          })
            .catch(err => {
              res
                .status(500)
                .json({message: "Failed to get Id"})
          })
});


/*
listening
last on page but first read, listen requires a port and a callback
*/
server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`)
});