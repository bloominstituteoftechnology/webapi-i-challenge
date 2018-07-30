// Import express from 'express';//ES MODULES
const express = require('express'); // CommonJS


// This is now a server I can add different urls/middleware/routers
const server = express();

// confugure endpoints/routing
// listening to traffic coming for root './' of site
// req=Request and res=Response
server.get('/', (req, res)=> {
  // res.send('<h1>Hello World</h1>');
  res.send({ hello: 'world' });
});

// this makes the server listen to  traffic on a specific port
server.listen(8000, () => console.log('API running...'));