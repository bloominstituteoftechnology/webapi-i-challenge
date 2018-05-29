const express = require('express');
const db = require('./data/db');

const port = 5555;
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    //1st argument-route where a resource can be interacted with
    //2nd argument-callback to deal with sending responses, and handling incoming
    res.send('hello from express');
});

server.get('/api/users', (req, res) => {
    db
    .find()
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json({ error });
    })
});

server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
    .then(response => {
        if (response.length === 0 ) {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {
            res.status(200).json(response[0])
            console.log(response)
        }})
        .catch(error => {
            res.status(500).json({ error: "The users information could not be retrieved." })
        })
    });
    
server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    if ( name && bio ) {
        db
        .insert({ name, bio })
        .then(response => {          
            res.status(201).json({id: response.id, name, bio});            
        })
        .catch(error => {
            res.status(500).json({ error: "The users information could not be retrieved." });
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
});
    // server.post('/api/users', (req, res) => {
    //     const { name, bio } = req.body;
    //     db
    //     .insert({ name, bio })
    //     .then(response => {
    //         res.send(response);
    //     })
    //     .catch(error => {
    //         res.json(error);
    //     })
    // });

server.delete('/api/users/:id', (req, res) => {
    db.remove(req.params.id)
    .then(response => {
        if (response === 1){
            res.status(200).json({ message:"Deleted" });
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
        console.log(response)
    })
    .catch(error => {
        res.status(500).json({ error: "The user could not be removed" });
    })
});

server.put('/api/users/:id', (req, res) => {
    const {name, bio} = req.body;
    if (name && bio) {
        db.update(req.params.id, {name,bio})
        .then(response =>{
            if (response === 1){
                res.status(200).json({id: response.id, name, bio})
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(error =>{
            res.status(500).json({ error: "The user information could not be modified." }); 
        }) 
    } else {
        res.status(400).json({ error: "The user information could not be modified." })
    }
})

server.listen(port, () => console.log(`Server running on port ${port}`));
    