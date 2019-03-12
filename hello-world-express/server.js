// server? What is a server?
// The server is a place on a computer that is listening for traffic and when it receives that traffic it knows what to do with said traffic
const express  =require('express');
// const http = require ('http');
// this in es6 can be an import statement but in order to remain compatible we are using the require syntax.
const port = 5000;

const server = express();

// const server = http.createServer((req, res)=>{
//   res.statusCode = 200;
//   res.setHeader("Content-Type",'text/plain');
//   res.end('Hello World, from NodeJS')
// })
server.get('/', (req, res) =>{
res.send('Hello world from express!');
});

server.listen (port, () => {
  console.log(`server listening on port: ${port}`);
});

// req will be the request object that comes to the server and res will be its response