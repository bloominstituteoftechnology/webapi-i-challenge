const express = require('express');
const server = express();

let users = [
    {
        name: 'Jane',
        bio: 'doe',
    }
]

server.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
})

server.get('/api/users', (req, res) => {
    setTimeout(() => {
        res.send(users);
    }, );
})

server.listen(8000, () => console.log('API running...'))
