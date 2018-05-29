const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.send('API running');
});

server.listen(5000, () => console.log('\n== API Running on Port 5000 ==\n'));