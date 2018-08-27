const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req, res)=> {
    res.send('Hello');
});

server.get('/users', (req, res)=> {
    db.find().then(users=> {
        res.status(200).json(users);
    }).catch(err=> {
        console.log('error', err);

        res.status(500).json({messgae: "error getting data"})
    });
})

server.get('/users/:id', (req, res)=> {
    db.findById(req.params.id).then(users => {
        res.status(200).json(users);
    }).catch(err=> {
        console.log('error', err);

        res.status(500).json({message: "error getting data"})
    });
})


server.listen(9000, ()=> console.log('/n== API on port 9k ==/n'));