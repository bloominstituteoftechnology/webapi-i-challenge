// server? What is a server?
// The server is a place on a computer that is listening for traffic and when it receives that traffic it knows what to do with said traffic

const http = require ('http');
// this in es6 can be an import statement but in order to remain compatible we are using the require syntax.

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res)=>{
  res.statusCode = 200;
  res.setHeader("Content-Type",'text/plain');
  res.end('Hello World, from NodeJS')

})

server.listen (port, hostname, () => {
  console.log(`server listening on http://${hostname}:${port}`);
});

// req will be the request object that comes to the server and res will be its response