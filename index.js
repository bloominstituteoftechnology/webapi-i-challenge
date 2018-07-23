const express = require('express');
const db = require('./data/db');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Home');
})

server.post('/api/users', (req, res) => {
    const { name, bio, created_at, updated_at } = req.body;
    if (!name || !bio) return res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
    db
        .insert({ name, bio, created_at, updated_at })
        .then(users => res.status(201).json(users))
        .catch(err => res.status(400).json({ error: 'There was an error while saving the user to the database' }));
})

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ error: 'The users information could not be retrieved.' }));
})

server.listen(8000, () => console.log('API running on port 8000'));