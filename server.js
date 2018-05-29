const express = require('express');
const db = require('./data/db');

const port = 5555;
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello from express');
});

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    db.insert({ name, bio })
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            res.json(error);
        });
});

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.json({ users })
        })
        .catch(error => {
            res.json({ error });
        })
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(user => {
            res.json({ user })
        })
        .catch(err => {
            res.json({ err });
        })
});

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(user => {
            res.json({ user })
        })
        .catch(err => {
            res.json({ err });
        })
});

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const { name, bio } = req.body;
    db.update(id, { name, bio })
        .then(count => {
            res.json({ count })
        })
        .catch(err => {
            res.json({ err })
        })
})

server.listen(port, () => console.log(`Server running on port ${port}`));