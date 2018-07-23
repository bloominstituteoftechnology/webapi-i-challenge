const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
})

server.get('/marvel', (req, res) => { // route handler
    const marvel = [ // endpoint data
        {
            id: 1,
            name: 'Captain America'
        },
        {
            id: 2,
            name: 'Iron Man'
        }
    ];

    res.status(200).json(marvel);
});

server.get('/marvel', (req, res) => { // route handler
    res.send(marvel);
    res.status(200).json(marvel);
});

server.listen(8000, () => console.log('API started'));