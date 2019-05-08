// implement your API here
const express = require('express');

const server = express();
const db = require('./data/db.js');

server.use(express.json());

server.get("/data/", (req, res) => {
    //console.log(res)
    db.find()
    .then(result => {
        console.log(result);
        res.send(result);
    })
    .catch(err => res.send(err));
})

server.get("/data/:id", (req, res) => {
    const { id } = req.params;
    
    db.findById(id)
    .then(result => res.send(result))
    .catch(err => res.send(err));
})

server.post("/data/", (req, res) => {
    db.insert(req.body)
    .then(result => {
        console.log(result);
        res.send(result);
    })
    .catch(err => res.send(err))
})

server.listen(8080, () => {
    console.log("Starting server...");
})