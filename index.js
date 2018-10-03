// implement your API here
const express = require('express');
const server = express();
const db = require('./data/db')
const cors = require('cors');

server.use(express.json());

const port = 4444;
server.listen(port, () => 
    console.log(`Port #${port}`)
);

server.use(cors()); // connects react

server.get('/', (req, res) => {
    res.send("watup?");
});

server.get('/api/contact', (req, res) => {
    res.status(200).send('<div><h1>Contact</h1><input placeholder="email" /></div>')
})

server.get('/api/about', (req, res) => {
    res.status(200).send('<h1>About Us</h1>')
})

server.get('/api/users', (req, res) => {
    db.find().then(users => {
        // console.log(users)
        res.json(users);
    }).catch(err => res.send(err))
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
   db.findById(id).then(user => {
       res.json(user);
   }).catch(err => res.send(err))
})

server.post('/api/users', (req, res) => {
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
            .send({ Error: `User does not exist by that id ${id}` });
        }
        res.status(201).json(user);
      });
    })
    .catch(err => console.error(err));
});

server.put('/api/users/:id', (req, res) => {
    console.log(req.params)
    const { id } = req.params;
    const { name, bio } = req.body;
    //check endpoints (verify name/bio)
    const newUser = { name, bio };
    db.update(id, newUser)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => console.error(err));
});

server.delete('/api/users/:id', (req, res) =>{
    const { id } = req.body
    db.remove(id)
        .then(removedUser => {
            res.status(202).json(removedUser)
        })
        .catch(err => console.error(err))
})