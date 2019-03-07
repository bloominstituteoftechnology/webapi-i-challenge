// implement your API here
const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.send('Hello from Express');
});

server.listen(3000, () => {
    console.log(`Server running.`);
});