const express = require('express');

const server = express();

const db = require('./data/db');

server.get('/', (req, res) => {
    res.send('Hello!')
});

server.get('/hobbits', (req, res) => {
    const hobbits = [
        {
            id: 1,
            name: 'Samwise Gamgee',
        },
        {
            id: 2,
            name: 'Frodo Baggins',
        },
    ]

    res.status(200).json(hobbits)
})

 /* server.get('/api/users', (req, res) => {
    db.find()
    .then(response => {
        res.send(response)
    })
    .catch(err => {
    })
}) */

server.post('/api/users', (req, res) => {
    db.insert({ bio: 'CS11 Student', created_at:Date.now(), updated_at:Date.now()})
    .then(response => {
        res.status(201).send(response)
    })
    .catch(error => {
        if(response.name === undefined || response.bio === undefined ) {
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user.'}).send(error);
        }
    })
})


server.get('/api/users', (req, res) => {
     db.find()
     .then(response => {
         res.status(200).json(response) 
     })
     .catch(err => {
     })
})

server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
    .then(response => {
        res.status(200).send(response)
    })
    .catch(error => {

    })
})

server.listen(8000, () => console.log('Api running on port 8000'))
