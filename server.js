const express= require('express');
const db= require('./data/db');

const port = 5555;
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    // 1st arg: route where a resource an be interacted with
    // 2nd arg: callback to deal with sending resonses and handling incoming data
    res.send('Howdy!');
})  

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    db
    .insert({ name, bio }).then(response => {
        res.send(response);
})
    .catch(error => {
        res.json(error);
    });
});
server.get('/api/users', (req, res) => {
    db.find().then(users => {
        res.json({ users })
    })
    .catch(error => {
        res.json({ error });
    });
});

server.get('/api/users/:id', (req, res) => {
    //pull id off of req.params;
    const { id } = req.body;
    //invoke proper db.method(id) passing it the id
    db
    .inser({ id }).then(response => {
        res.send(response);
    })
    //handle the promise like above
    .catch(error => {
        rex.json(error);
    });   
});

server.listen(port, () => console.log(`Server running on port ${port}`));