// implement your API here
const express = require('express');
const server = express();
const db = require('./data/db')
const cors = require('cors');


const port = 4444;
server.listen(port, () => 
    console.log(`Port #${port}`)
);

server.use(cors()); // connects react

server.get('/', (req, res) => {
    res.send("watup?");
});

server.get('/api/users', (req, res) => {
    db.find().then(users => {
        console.log(users)
        res.json(users);
    }).catch(err => res.send(err))
})

server.get('/api/users/:id', (req, res) => {
    db.find().then(user => {
        console.log(req)
        res.json(users);
    }).catch(err => res.send(err))
    // const user = db.find(user => user.id === req.params.id);
    // res.json(user)
})