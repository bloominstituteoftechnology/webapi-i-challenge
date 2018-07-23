const express = require('express');
const port = 8000;

const server = express();

server.get('/', (req, res)=> {
    res.send('hello from get')
})

server.listen(port, () => console.log('Server is running'));