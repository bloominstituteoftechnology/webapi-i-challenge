const express = require ('express');
const db= require ('./data/db');

const server =express();

server.use(express.json());

server.get('/users', (req,res) =>{
    db.find()
    .then(users =>{
        res.json(users)
    })
    .catch(() => {
        res.status(500).json({error:'User info not retrieved'})
    })
})

server.get('/users/:id', (req, res) => {
    const {id}= req.params
    db.findById(id)
    .then(response => {
        if( response.length <1 ) {
            res.status(404).json({message:'User with specified ID does not exist'})
        } else {
            res.json(response)
        }
    })
    .catch(() => {
        res.status(500).json({ error:'User info could not be retrieved.'})
    })
});

server.listen(8000, ()=> {
    console.log('Server up on port:8000')
});