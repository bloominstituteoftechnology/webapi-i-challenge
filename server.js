const express = require('express');
const db = require('./data/db');

const port = 5555;
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    //1st arg: route where a resource can be interacted with.
    //2nd arg: callback to deal with sending responses, and handling incoming.
    res.send('Hello from express');
});

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    if(!name || !bio){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        return;
    } 
    db.insert({ name, bio })
    .then(response => {
            res.status(201).send(response);
    })
    .catch(error => {
        res.status(500).json({ error: "The users information could not be retrieved" });
    })    
});

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.status(500).json({ error: "The users information could not be retrieved." });
        });
})

server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
        .then(response => {
            if(response.length === 0){
                return res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else{
                res.status(200).json(response[0]);
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The users information could not be retrieved"})
        })
})

server.delete('/api/users/:id', (req, res) => {
    db.remove(req.params.id)
        .then(response => {
            if(response === 0){
                return res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else {
                return res.status(200).json(response[0])
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The user could not be removed"})
        })
})

server.put('/api/users/:id', (req, res) => {
    const { name, bio } = req.body;
    if(!name || !bio){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        return;
    } 
    db.update(req.params.id)
        .then(response => {
            console.log(response);
            if(response.length === 0){
                return res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else{
                return res.status(200).json(req.body);
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The user could not be removed"})
        })
})

server.listen(port, () => console.log(`Server running on port ${port}`));