const express = require ('express');
const db = require ('./data/db.js');

const port = 5555;
const server = express();
server.use(express.json())

server.get('/', (req, res) => {
    // 1st arg: route where a resource can be interacted with - request
    // 2nd arg: callback to deal with sending responses and handling incoming data - response
    res.send('Hello from express');
});

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    if (name )
    db
        .insert({ name, bio })
        .then(response => {
            res.send(response);
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

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
   db
    .findById(id)
    .then(users => {
        res.json({ users });
    })
    .catch(error => {
        res.json({ error });
    });
});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const { name, bio } = req.body
    db
        .update(id, { name, bio })
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error });
        });
});
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    db
        .remove(id)
        .then(users => {
            res.json({ users });
            console.log(req)
        })
        .catch(error => {
            res.json({ error });
        });
});


server.listen(port, () => console.log(`Server running on port ${port}`));