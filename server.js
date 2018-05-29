const express = require('express');
const db = require('./data/db');

const port = 5555;
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    // 1st arg: route where a resource can be interacted with
    // 2nd arg: callback to deal with sending responses, and handling incoming data.
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
            res.json({ error });
        });
});


server.delete('/api/users', (req, res) => {
    const { id } = req.query;
    let user;

    db
        .findById(id)
        .then(foundUser => {
            user = { ...foundUser };
        
            db.remove(id).then(response => {
                res.status(200).json(user);
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

server.get('/api/users/:id', (req, res) => {
    // pull id off of req.params;
    // invoke proper db.method(id) passing it the id.
    // handle the promise like above
    const id = req.params.id;

    db
        .findById(id)
        .then(users => {
            if (users.length === 0) {
                res.status(404).json({ mesage: 'user not found' });
            } else {
                res.json(users[0]);
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

server.listen(port, () => console.log(`Server running on port ${port}`));