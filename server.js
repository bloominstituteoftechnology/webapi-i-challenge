const express = require('express');

const server = express();
const port = 5000

server.get('/', (req, res) => {
    res.send("Hello from express")
})

server.listen(port, () => console.log(`Server running on port ${port}`));