// implement your API here
// how to import / export code between files
// introduce how routing works

// import express from 'express'; // ES2015
const express = require('express'); // CommonJS modules > module.exports = someCode;
const cors = require('cors');// install this package to react

const db = require('./data/db.js');

const server = express(); // creates the server

server.use(cors()); // this needed to connect form react

server.use(express.json()); // selects language to communicate with(formatting our req.body object)

server.get('/', (req, res) =>{// request/route handler
    res.send('<h1>Hello FSW13!</h1>');
});

server.get('/api/about', (req, res) =>{
    res.status(200).send('<h1>About Us</h1>');
});

server.get('/api/contact', (req, res) => {
    res.status(200).send('<div><h1>Contact</h1><input placeholder="email" /></div>');
});

server.post('/api/users', (req, res) =>{
    console.log(req.body); // console log body 
    const { name, bio } = req.body;
    const newUser = { name, bio };
    db.insert(newUser)
    .then(insertedUser => {
        res.status(201).json({'User Created': insertedUser});
    })
    .catch(err => {
        res.send(err);
    });
})

server.get('/api/users', (req, res) =>{
    db.find()
    .then(users =>{
     console.log('\n** users **', users);
     res.json(users);   
    })
    .catch(err => res.send(err));
});

server.get('/api/users/:id', (req, res) =>{
    const { id } = req.params;
    db.findById(id)
    .then(users =>{
     console.log('\n** users **', users);
     res.json(users);   
    })
    .catch(err => res.send(err));
});

server.post('/api/users', (req, res) =>{
    const { name, bio } = req.body;
    const newUser = { name, bio };
    db.insert(newUser)
    .then(userId => {
        const { id } = userId;
        db.findById(id).then(user => {
            console.log(user);
            if (!user) {
                return res
                    .status(422)
                    .send({ Error: `user does not exist by that ${id}`});
            }
            res.status(201).json(user);
        });
    })
    .catch(err => consloe.error(err))
})

server.delete('/api/users/:id', (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    db.remove(id)
    .then(removedUser =>{
        console.log(removedUser);
        res.status(200).json(removedUser);
    })
    .catch(err => console.error(err));
});

server.put('/api/users/:id', (req, res) =>{
    const { id } = req.params;
    const { name, bio } = req.body;
    const newUser = { name, bio};
    db.update(id, newUser)
        .then(user => {
            console.log(user);
            res.status(200).json(user);
        })
        .catch(err => console.error(err));
});
// watch for traffic in a particular computer port
const port = 5000;
server.listen (port, () => 
console.log(`\n=== API running on port ${port} ===\n`)
);

// http://localhost:3000 > the 3000 is the port.
// 80: http, 443: https, 25: email servers 
