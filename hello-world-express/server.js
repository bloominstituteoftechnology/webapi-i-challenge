// server? What is a server?
// The server is a place on a computer that is listening for traffic and when it receives that traffic it knows what to do with said traffic
const express  =require('express');
// const http = require ('http');
// this in es6 can be an import statement but in order to remain compatible we are using the require syntax.
const port = 5000;

const server = express();
server.use(express.json());

// const server = http.createServer((req, res)=>{
//   res.statusCode = 200;
//   res.setHeader("Content-Type",'text/plain');
//   res.end('Hello World, from NodeJS')
// })

// The '/' slash in the get request is the root of out api 
// This function is often refferred to and understood as the request handler function and can be in es6 arrow or plain function format
// server.get('/', (req, res) =>{
// res.send('Hello world from express!');
// });

server.get('/hobbits', (req, res) => {
res.send ('welcome to Hobbiton')
  // status code for 200 means o
})

server.post('/hobbits', (req,res)=>{
res.status(201).json({url:'/hobbits', operation: 'POST'})
})

server.put('/hobbits', (req,res)=>{
  res.status(200).json({url:'/hobbits', operation: 'PUT'})
})

server.delete('/hobbits', (req,res)=>{
  res.sendStatus(204)
})



server.listen (port, () => {
  console.log(`server listening on port: ${port}`);
});

// req will be the request object that comes to the server and res will be its response