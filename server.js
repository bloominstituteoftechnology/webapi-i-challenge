const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.send('Hello World from server.js');
});

server.listen(8001, () => console.log('API Running on port 8001'));