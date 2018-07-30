const express = require('express');


//The return of calling express() is an instance of an Express application that we can use to configure our server and, eventually, start “listening” and responding to requests. 
const server = express(); 

server.get('/', (req, res) =>{
    res.send('Hello World');
});

server.listen(8000, () => console.log('API running on port 8000'));