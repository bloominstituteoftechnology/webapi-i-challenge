// import express from 'express'; // ES Modules
const express = require('express'); // CommonJS
const db = require('./data/db');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.status(200).send('Hello World');
});

server.get('/api/users', async (req, res) => {
    try {
        const users = await db.find();
        res.status(200).json(users);
    } catch(err) {
        res.status(500).json({error: 'The users information could not be retrieved.'});
    }
});

server.get('/api/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await db.findById(id);
        if(user[0]) {
            res.status(200).json(user);
        } else {
            res.status(404).json({error: 'The user with the specified ID does not exist.'});
        }
    } catch(err) {
        res.status(500).json({error: 'The user information could not be retrieved.'});
    }
});

server.post('/api/users', async (req, res) => {
    try {
        const userInfo = {...req.body};
        if(!userInfo.name || !userInfo.bio) {
            res.status(400).json({error: 'Please provide name and bio for the user.'});
        } else {
            const newUser = await db.insert(userInfo);
            res.status(201).json(userInfo);
        }
    } catch(err) {
        res.status(500).json({error: 'There was an error while saving the user to the database.'});
    }
});

server.delete('/api/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const findUser = await db.findById(id);
        if(findUser[0]) {
            const delUser = await db.remove(id);
            res.status(200).json(findUser);
        } else {
            res.status(404).json({error: 'The user with the specified ID does not exist.'});
        }
    } catch(err) {
        res.status(500).json({error: 'The user could not be removed.'});
    }
});

server.put('/api/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = req.body;
        let findUser = await db.findById(id);
        if(findUser[0] && (user.name && user.bio)) {
            const updateUser = await db.update(id, user);
            findUser = await db.findById(id);
            res.status(200).json(findUser);
        } else if (!findUser[0]) {
            res.status(404).json({error: 'The user with the specified ID does not exist.'});
        } else {
            res.status(400).json({error: 'Please provide name and bio for the user.'});
        }
    } catch(err) {
        res.status(500).json({error: 'The user information could not be modified.'});
    }
});

server.listen(8000, () => console.log('API running...'));
