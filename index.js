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

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    
    db
        .findById(id)
        .then(users => {
            if (users.length === 0) {
                res.status(404).json({ message: 'Not found' });
            } else {
                res.json(users[0]);
            }
        })
        .catch (message => {
            res.status(500).json({ message: "The user with the specified ID does not exist." })
        })
})

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

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params
    
    db
        .remove(id)
        .then(response => {
            res.status(204).json(response);
        })
        .catch(err => {
            res.status(500).json({message: "The user with the specified ID does not exist."})
        })
})

server.put('/api/users/:id', (req, res) => {
    const {id} = req.params
    const update = req.body
    db
        .update(id, update)
        .then(count => {
            if ( count > 0 ) {
                db
                    .findById(id)
                    .then(users => {
                        res.status(200).json(users[0])
                    })
            } else {
               res.status(404).json({message: "user not found"}) 
            }
        })
        .catch(err => {
            res.status(500).json({message: "The user with the specified ID does not exist."})
        })

})

  server.listen(port, () => console.log(`Server is listening to port ${port}`));