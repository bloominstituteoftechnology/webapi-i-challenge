// require the express module
const express = require('express')

//Creates an express application using the express module
const server = express();


//configures our server to execute a function fro every GET request to "/"
// the second argument is the "Route Handler Function"
// the route handler function will run on every GET request to '/'
server.get('/', (req,res) => {

  // express will pass the req and res objects to this function

  res.send("Hello World")
})

//set which port to listent to and the callback to run after the server starts
server.listen(8000, ()=> console.log('API running on port 8000 ....'))