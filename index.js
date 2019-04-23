// implement your API here

const express = require('express'); //import

const db = require('./data/db.js'); //add this line 

const server = express(); //creates express app using express module

server.use(express.json()); //add this fro POST 

//GET REQUEST IS WORKING 
server.get('/', (req, res) => {
    res.send('Get request is working')
});

//GET USERS /api/users
server.get('/api/users', (req, res) => {
    db  //doesn't need a .name b/c it doesn't have one 
      .find()
      .then(users => {
          res.status(200).json(users);
      })
      .catch(err => {
          res.status(500).json({ error: err, message:  "The users information could not be retrieved."})
      })
})

//GET REQUEST FOR /api/users/:id
server.get('/api/users/:id', (req, res) => {
// if (user.length === 0) {
//     sendError(404, '')
// }
    db 
    .findById()
    ,then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(404).json({ error: err, message: "The user information could not be retrieved."})
    })
})



//POST REQUEST for /api/users
server.post('/api/users', (req, res) => {
    const userInformation = req.body;
    console.log('request body:', userInformation);
if (!name || !bio) {
    sendError(400, "Please provide name and bio for the user", res);
      return
}

    db
    .insert(userInformation)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(err => {
        res.status(500).json({ error: err, message: "Please provide name and bio for the user."})
    });
});

//DELETE REQUEST for api/users/:id
server.delete('/api/users/:id', (req, res) => {
    //axios.delete(...url/${id})
    const userId = req.params.id; //req.params has the url parameters
    db 
    .remove(userId)
    .then(deleted => {
        //res.status(200).json(deleted);
        res.status(204).end(); //sends back a response to the client w/o sending data 
    })
    .catch(error => {
        res.status(404).json({ error: err, message: "The user with the specified ID does not exist." })
    })
})

//PUT REQUEST for /api/users/:id
//need to put hte url in as 'http://localhost:5000/api/users/1 or any # id that you want to access//
server.put('/api/users/:id', (req, res) => {
    const userInformation = req.body;
    console.log('request body:', userInformation);

    const userId = req.params.id

    db
    .update(userId, userInformation)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(error => {
        res.status(400).json({ error: err, message: "Please provide name and bio for the user."})
    })
})





server.listen(5000, () => {
    console.log('\n*** API running on port 5K ***\n')
})