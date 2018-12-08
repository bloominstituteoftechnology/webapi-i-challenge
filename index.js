// implement your API here
// require the express npm module, needs to be added to the project using "yarn add" or "npm install"
const express = require('express');

const db = require('./data/db');

// creates an express application using the express module
const server = express();

// configures our server to execute a function for every GET request to "/"
// the second argument passed to the .get() method is the "Route Handler Function"
// the route handler function will run on every GET request to "/"
server.get('/api/users', (req, res) => {
  // express will pass the request and response objects to this function
  // the .send() on the response object can be used to send a response to the client
});

//create a brand new endpoint that returns a list of hobbits
server.get('/api/users/:id', (req, res) => {
 
  //let next developer know that this is a json api, intending to return json
  //return json by default
})

server.post('/api/users', (req, res) => {

}) 

server.put('/api/users/:id', (req,res) => {

})

server.delete('/api/users/:id', (req, res) => {
  
})

// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts
server.listen(8000, () => console.log('API running on port 8000'));