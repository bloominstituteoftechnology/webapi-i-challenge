// implement your API here
const db = require('./data/db');

const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.send('Hello World')
});

server.get('/hobbits', (req, res) => {
    const hobbits = [{
            id: 1,
            name: 'Samwise Gamgee',
        },
        {
            id: 2,
            name: 'Frodo Baggins',
        },
    ];

    res.status(200).json(hobbits);
})

server.get('/users', (req, res)=> {
    const users = [
        {id: 1, user: 'oscar'},
        {id: 2, user: 'sam'}
    ];
    
    res.status(200).json(users);

})


server.listen(8000, () => {
    console.log('API running on port 8000');
})
