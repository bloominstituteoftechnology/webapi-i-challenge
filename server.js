const express = require('express');
const db = require('./data/db');

const server = express();
const port = 5555;

// Extend server to use JSON
server.use(express.json());


server.listen(port, () => console.log(`Server running on port ${port}`));