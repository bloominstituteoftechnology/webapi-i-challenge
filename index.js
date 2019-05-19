// implement your API here
const express = require('express');

const port = 5000;

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello World');
});

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

server.post('/hobbits', (req,res) => {
    res.status(201).json({ url: '/hobbits', operation: 'POST'});
});

server.put('/hobbits', (req, res) => {
    res.status(200).json({ url: '/hobbits', operation: 'PUT'});
});

server.delete('/hobbits', (req, res) => {
    res.sendStatus(204);
})

server.listen(port, () => console.log(`\n*** API running on port ${port} ***\n`));