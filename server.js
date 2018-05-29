const express = require('express');
const db = require('./data/db');

const port = 5555;
const server = express();
server.use(express.json());

server.get('/', (req, res) =>  {
res.send('hello from express');
})

server.post('/api/users', (req, res) => {
const { name, bio } = req.body;
db
.insert({ name, bio })
.then(response => {
    res.send(response);
})
.catch(error => {
    res.json(error);
})
});
server.get('/api/users', (req, res) => {
    db
    .find()
    .then(users=> {
        res.json({ users });
    })
    .catch(error => {
        res.json({ error });
    })
})
server.get('/api/users/:id', (req, res) => {
const { id } = req.params;
    db
    .findById(id)
    .then(users => {
        res.json({ users });
    })
    .catch(users => {
        res.json({ error });
    })
})
server.put('/api/users/:id', (req, res) => {
const { name, body } = req.body;
const { id } = req.params;
    db
    .update(req.params.id, req.body)
    .then(users => {
        res.json({ users })
    })
    .catch(users => {
        res.json({ error });
    })
})
server.delete('/api/users/:id', (req, res) => {
const { id } = req.params;
    db
    .remove(id)
    .then(users => {
        res.json({ users })
    })
    .catch(users => {
        res.json({ error })
    })
})


server.listen(port, () => console.log(`Server running on port ${port}`));