// require the express npm module, needs to be added to the projecct using "yarn add" or
const express = require('express');

// creates an express application using the express module
const server = express();

//require the data/db.js file
const db = require('./data/db.js')
// Or
// import db from './data/db.js' in es2015 syntax but let's not

/*configures our server to execute a function fore every GET request to "/"
the second argument passed o the .get( ) method is the "Route Handler Function"
the route handler function will run on every GET request to "/" */
server.get('/', (req, res) =>{
  // express will pass the request and resposne objects to this function
  // the .send() on the response object can be used tov send a repsonse to the client
  res.send('Hello World');
});



//define a route handler to repons eto Get requests to /hobbits
// server.get('/hobbits', (req, res) => {
//   //route handler to hobbits here
//   const hobbits = [
//     {
//       id: 1,
//       name: 'Samwise Gamgee',
//     },
//     {
//       id: 2,
//       name: 'Frodo Baggins',
//     },
//   ];
//
//   res.send(200).json(hobbits);
// });


//define a route handler to repons eto Get requests to /users
server.get('/api/users', (req, res) => {
  //route handler to hobbits here
  db.find().then((results) => {
      res.status(200).json(results);
  })
});
// once the server is fully configured we can have it "listen"  for connections on a particular "port"
// the callback funciton passed as the second argument will run once when the server starts

server.listen(8000, () => console.log('API running on port 8000'))
