// implement your API here
const express = require('express');

const server = express();
const db = require('./data/db.js');

server.use(express.json());

server.get("/api/users/", (req, res) => {
    //console.log(res)
    db.find()
        .then(result => res.json(result))
        .catch(err => res.json(err));
})

server.get("/api/users/:id", (req, res) => {
    const { id } = req.params;

    db.findById(id)
        .then(result => res.json(result))
        .catch(err => res.json(err));
})

server.post("/api/users", (req, res) => {
    db.insert(req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

server.listen(8080, () => {
    console.log("Starting server...");
})