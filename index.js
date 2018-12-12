const express = require('express');

const server = express();
const PORT = 3000


//endpoints

server.get('/', (req, res) => {
    res.send({ test: "This is test"});
});

server.get('/greet/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Hello ${name}`);
});


// Listening

server.listen(PORT, () => {
   console.log(`Server is swag ${PORT}`);
});