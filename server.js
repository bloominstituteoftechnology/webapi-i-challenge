const express = require("express");
const db = require('./data/db');
const port = 5555;
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello from express');
})

server.post('/api/users', (req,res) => {
    const { name, bio } = req.body;
    db.insert({ name, bio })
    .then(response => {
        res.send(response)
    })
    .catch(error => {
        res.json(error);
    })
})

server.get('/api/users', (req,res) => {
    db.find().then(users => {
        res.json({ users });
    })
    .catch(error => {
        res.json({ error })
    })
})

server.get("/api/users/:id", (req, res) => {

    
});

server.listen(port, () => console.log(`Server running on port ${port}`));
