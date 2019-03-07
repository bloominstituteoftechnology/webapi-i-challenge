// implement your API here

// Import Express
const express = require('express');

// Import db Functions
const db = require('./data/db.js');

// Initialize Express
const server = express();


// HOME
server.get('/', (req, res) => {
    res.send('Home');
});


// CREATE
server.post('/api/users', (req, res) => {
    res.send('post user');
});


// READ
server.get('/api/users', (req, res) => {
    res.send('get users');
});

server.get('/api/users/:id', (req, res) => {
    res.send('get users id');
});


// UPDATE
server.put('/api/users/:id', (req, res) => {
    res.send('put user id');
});


// DESTROY
server.delete('/api/users/:id', (req, res) => {
    res.send('delete user id');
});


// Run Server
server.listen(3000, () => {
    console.log(`Server running.`);
});