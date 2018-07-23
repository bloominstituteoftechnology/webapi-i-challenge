const express = require('express');
const port = 8000;
const helmet = require('helmet');
const server = express();

//add middleware
server.use(helmet());

server.get('/', (req, res)=> {
    res.send({  hello : 'world' })
})

server.listen(port, () => console.log('Server is running'));