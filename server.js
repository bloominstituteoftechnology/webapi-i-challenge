const express = require('express');
const db = require('./data/db');

const port = 5555;
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    //1st arg: route where a resource can be interacted with
    //2nd arg: cb to deal with sending res and handling incoming.
    res.send('Hello from express');
});

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    db
        .insert({ name, bio })
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.json(error);
        });
});

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json(error);
        });
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db
        .findById(id)
        .then(users => {
            res.json({ users })
        })
        .catch(error => {
            res.json(error);
        })
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db
        .remove(id)
        .then(users => {
            res.json({ users })
        })
        .catch(error => {
            res.json(error);
        })
})

server.put('/api/users/:id', (req, res) => {
    const { name, bio } = req.body;
    const id = req.params.id;
    db
        .update(id, { name, bio })
        .then(count => {
            res.json(count)
        })
        .catch(error => {
            res.json(error);
        })

})


server.listen(port, () => console.log(`Server running on port ${port}`));