// implement your API here
const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.send('Home');
});

server.get('/api/users', (req, res) => {
    res.send('get users');
});

server.get('/api/users/:id', (req, res) => {
    res.send('get users id');
});

server.post('/api/users', (req, res) => {
    res.send('post user');
});

server.delete('/api/users/:id', (req, res) => {
    res.send('delete user id');
});

server.put('/api/users/:id', (req, res) => {
    res.send('put user id');
});

server.listen(3000, () => {
    console.log(`Server running.`);
});