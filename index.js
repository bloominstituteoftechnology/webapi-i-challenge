
// SET UP AND START SERVER
const express = require('express'); //define server;
const server = express(); //instantiate server;

server.use(express.json()); // Makes express read JSON format;
const port = 4000; // establish server;



//  set up server to listen for changes
server.listen(port, () => console.log(`=*= Server rolling on port: ${port} =*=`)
