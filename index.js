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
    if (!req.body.name || !req.body.bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    } else
    db.insert(req.body)
        .then(newUser => res.status(201).json(newUser))
        .catch(err => res.status(500).json({error: "There was an error while saving the user to the database."}))
})

server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

server.put("/api/users/:id", (req, res) =>{
    const { id } = req.params;

    db.update(id, req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

server.listen(8080, () => {
    console.log("Starting server...");
})