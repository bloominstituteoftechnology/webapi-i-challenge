const express = require('express');

const database = require('./db.js');

const server = express();

server.use(express.json());


server.get('/', (req,res) => {
    res.status(200);
    res.send('Welcome To ExpressJS');
});

server.get('/users', (req, res)=>{
    database.find().then(users => {
        console.log(users);
        res.status(200).json(users)
    }).catch(err => {
        res.status(500).json({message: err.message})
    })
})

server.get('/users/:id', (req, res) => {
    const idVar = req.params.id;

    database.findById(idVar)
        .then(user => {
            if(!user){
                res.status(404).json({message: 'user does not exists'})
            }else {
                res.status(200).json(user)
            }
        })
        .catch(err => 
            {res.status(500).json({message: err.message})
        })
})


server.post('/users', (req, res)=> {
    const newUser = req.body;

    console.log(newUser.name, newUser.bio);

    if(!newUser.name || !newUser.bio){
        res.status(500).json({message: "User name and Bio reqiured"})
    } else{
        database.insert(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    }
})

server.put('/users/:id', (req, res)=>{
    const {id} = req.params;
    const changes = req.body;

    database.update(id, changes)
        .then(id => {
            res.status(200).json(changes)
        })
        .catch(err => res.status(500).json({
            message: err.message
        }))
    
})

server.delete('/users/:id', (req, res)=> {

    const {id} = req.params;

    database.remove(id)
        .then(id => {
            res.status(200).json(id)
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
     
})


module.exports = server;