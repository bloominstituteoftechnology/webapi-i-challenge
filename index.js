const express = require('express');
const db = require('./data/db');

const port = 8000;
const server = express();
server.use(express.json());


server.get('/', (req, res) => {  
    res.send('Hello World!');
  });


server.get('/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.status(500)
            res.json({ error: 'The user information could not be retrieved.' })
        });
});

server.post('/users', (req, res) => {
    const { name, bio } = req.body;
    if(!name || !bio) {
        res.status(400)
        res.json({ error: 'Please provide name and bio for the user.' })
    }
    db
        .insert({
            name,
            bio,
        })
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            res.status(400)
            res.json({ error: 'Please provide name and bio for the user.' })
        });
});




server.listen(port, () => console.log('API running...'));