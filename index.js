const express = require('express');
const apiRoute = require('./routes/api');
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.send("   <h2> Lambda User Api </h2>");
});

server.use("/api/posts", apiRoute);

server.listen('8000', () => {
    console.log('API is running and server is listening on port 8000');
});



