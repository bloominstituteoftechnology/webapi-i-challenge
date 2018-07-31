const express = require('express');
const server = express();
const db = require('./data/db');

server.use(express.json());

server.listen(8000, () => console.log("Server up on port 8000"))