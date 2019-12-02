// implement your API here

const express = require('express');
// import express from 'express ^- same

const server = express();

const port = 8000

//request handler function
server.get('/', (req, res) => { 
    res.send('hello world');
})

server.get('/hobbits', (req, res) => {
    const hobbits = [
        {
            id: 1,
            name: 'Samwise Gamgee'
        },
        {
            id: 2,
            name: 'Frodo Baggins'
        }
    ];
    res.status(200).json(hobbits);
})

server.listen(port, () => console.log('API RUNNING ON PORT 8000'));

