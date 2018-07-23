const express = require('express');

const server = express();

const db = require('./data/db.js')

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(user => {
            res.json({ user })
        })
        .catch(error => {
            res.status(404).json({ error: 'not retrieved' })
            return;
        });

})

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    if (!name || !bio) {
        res.status(404).json({ error: 'Need all parameters' })
    }
    db
        .insert({ name, bio })
        .then(users => {
            res.status(200).json({ users })
        })
        .catch(error => {
            res.status(500).json({error: 'Error while adding'})
        })
})

server.listen(8000, () => console.log('API running... *.*'))