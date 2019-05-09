const express = require('express');

const db = require('./data/db.js');

const server = express();

const { users } = db;

server.use(express.json());

server.get('/', (req, res) => {
    res.send("Yo Users")
})

server.get('/api/users', (req, res) => {
    db.find().then(users => {
        res.status(200).json(users)
    }).catch(({ code, message }) => {
        res.status(500).json({err: "The users information could not be retrieved."});
    })
});

server.post('/api/users', (req, res) => {
    const user = req.body;
    console.log('request body: ', user);
    if(user.name && usernbio) {

    db.insert(user).then(user => {
        res.status(201).json(user)
    }).catch(({ code, message}) => {
        res.status(500).json({err: "There was an error while saving the user to the database"});
    });
} else {
    res.status(400).json({err: "Please provide name and bio for the user."});
}
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id).then(user => {
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ err: "The user with the specified ID does not exist."});
        };
    })
    .catch(({code, message}) => {
        res.status(500).json({err: "The user information could not be retrieved."});
    })
})

server.put('/api/users/:id', (req, res)=>{
    const { id } = req.params;
    const updateUser  = req.body;
  
    db.update(id, updateUser )
    .then(dbUser  => {
      if (!updateUser.name || !updateUser.bio){
        return res.status(400).json({ message: "Please provide name and bio for the user."})
  
      }else if (!dbUser){
        return res.status(404).json({ message: "The user with the specified ID does not exist." })
  
      }else {
        res.status(200).json(updateUser);
      }
    })
    .catch(err=> { 
      res.status(500).json({ error: "The user information could not be modified." })
    })
  })
    

server.delete('/api/users/:id', (req, res) => {
    const { id} = req.params;
    db.remove(id).then(user => {
    if (user) {
        res.json({message: "Deleted"})
    } else {
        res.status(404).json({message: "The user with teh specified ID does not exist."});
    }
})
.catch(err => {
    res.status(500).json({err: "The user could not be removed"});
})
});

server.listen(9000, () => {
    console.log('Listening on port 9000');
})