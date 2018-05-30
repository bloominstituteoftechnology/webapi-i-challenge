const express = require('express');
const db = require('./data/db');
const cors = require('cors');

const port = 5555;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000'}));

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
  };
  

server.get('/', (req, res) => {
    res.send('Hello from express');
})

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    if (!name || !bio) {
      sendUserError(400, 'Must provide name and bio', res);
      return;
    }
    db
      .insert({
        name,
        bio,
        
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

//Below, users = response
server.get('/api/users', (req, res) =>{
    db
    .find()
    .then(users => {
        res.json({ users })
    })
    .catch(error => {
        sendUserError(500, 'The users information could not be retreived.', res)
    });
});

server.get('/api/users/:id', (req,res) => {
// pull id off of req.params;
// invoke proper db.method(id) passing it the id 
// handle the promise like above
    const { id } = req.params;
    db.findById(id)
        .then(user => {
            res.json(user);
        })
        .catch(error => {
            res.json({error: "The users information could not be retrieved."});
        });



});

server.delete('/api/users/:id', (req , res) => {

    const {id} = req.params;
    db.remove(id)
        .then(user => {
            res.json({user});
        })
        .catch(error => {
            res.json({error});
        });
});

server.put('/api/users/:id', (req, res) => {
    const { name, bio } = req.body;
    const id = req.params.id;
    db.update(id, {name:'Harrison', bio:'Carpenter'}) 
        .then(response =>{
            res.json(response);
        })
        .catch(error => {
            res.json({error});
        })

    });



server.listen(port, () => console.log(`Server running on port ${port}`));