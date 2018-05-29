//common js = syntax for importing and exporting JS

const express = require('express');
const db = require('./data/db');

const port = 5555;
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    // 1st arg: route where a resource can be interacted with
    // 2nd arg: callback to deal with sending responses, and handling incoming
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
        res.json({ users });
    })
    .catch(error => {
        res.json({ error });
    })
})

server.listen(port, () => console.log(`Server is running on port ${port}`));