const express = require('express');
const db = require('./data/db');

const port = 5000;
const server = express();
server.use(express.json());

// Is this an API?

server.get('/', (req, res) => {
    // 1st arg: route where a resource can be interacted with
    // 2nd arg: callback to deal with sending responses amd handling incoming
    res.send('Hello from express!');
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
        .find().then(users => {
            res.json({ users });
        })
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error });
        });
});

server.get('/api/users/:id', (req, res) => {
    
    const { id } = req.params;

    db
        .findById(id)
        .then(response => {
            if (!response) {
                res.status(404);
                res.json('The user with the specified ID does not exist.');
            }
            else {
                res.json(response);
            }
        })
        .catch(error => {
            res.status(500);
            res.json({ error: 'The user information could not be retrieved.' });
        })
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db
        .remove(id)
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.json(error);
        });
});

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = req.body;
    db
        .update(id, user)
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.json(error);
        });
});

server.listen(port, () => console.log(`Server running on port ${port}`));