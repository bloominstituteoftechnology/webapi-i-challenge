// implement your API here
const express = require('express');

const db = require('./data/db.js');

const port = 5000;

const server = express();
server.use(express.json());


server.get('/api/users', (req, res) => {

    db
    .find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json('The users information could not be retrieved.');
    });
});

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db
    .findById(userId)
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(404).json('The user with the specified ID does not exist.');
    });
});

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    console.log('request body: ', userInfo);

    db
    .insert(userInfo)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(err => {
        res.status(500).json('Please provide name and bio for the user.');
    });
});

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db.
    remove(userId)
    .then(deleted => {
        res.status(204).end();
    })
    .catch(err => {
        res.status(500).json('Error deleting the user.');
    });
});
 
server.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db.
    update(userId)
    .then(updated => {
        res.status(200).json();
    })
    .catch(err => {
        res.status(500).json({error : 'The user information could not be modified.'});
    })
    
})

server.listen(port, () => console.log(`\n*** API running on port ${port} ***\n`));