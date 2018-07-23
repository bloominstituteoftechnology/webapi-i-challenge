const express = require('express'); //  to import the express module and make it available to our application
const db = require('./data/db.js');
const cors = require('cors');

const server = express();
const port = 3333;
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => { 
    res.send('Hello World');
  });

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({error: "The users information could not be retrieved."})
        })
});

server.post('/api/users', (req, res) => {
    // if (!name||!bio) {
    //     return res.status(400)({error: "Please provide name and bio for the user."})
    // }

    const newUser = req.body;

    db
        .insert(newUser)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            res.status(500).json({error: "There was an error while saving the user to the database"})
        })
})

server.delete('/api/user', (req, res) => {
    const { id } = req.query
    
    db
        .remove(id)
        .then(response => {
            res.status(204).json(response);
        })
        .catch(err => {
            res.status(500).json({message: "The user with the specified ID does not exist."})
        })
})

  server.listen(port, () => console.log(`Server is listening to port ${port}`));