const express = require ('express');
const db= require ('./data/db');

const server =express();

server.use(express.json());

server.get('/users', (req, res) =>{
    db.find()
    .then(users =>{
        res.json(users)
    })
    .catch(() => {
        res.status(500).json({error:'User info not retrieved'})
    })
})

server.get('/', (req, res) => {
    res.send('Hello World');
});

server.get('/users/:id', (req, res) => {
    const {id}= req.params
    db.findById(id)
    .then(response => {
        if( response.length < 1 ) {
            res.status(404).json({message:'User with specified ID does not exist'})
        } else {
            res.json(response)
        }
    })
    .catch(() => {
        res.status(500).json({ error:'User info could not be retrieved.'})
    })
});

server.post('/users', (req, res) => {
    const { name, bio, created_at, updated_at }= req.query;
    if (!name||!bio) {
        sendUserError(404, 'Provide name and bio', res);
        return;
    }
    db.insert({
        name, bio, created_at, updated_at
    })
    .then(response => {
        res.status(201).json(response);
    })
    .catch(error => {
        console.log(error);
        sendUserError(400, error, res);
        return;
    });
});

server.listen(8000, ()=> {
    console.log('Server up on port:8000')
});