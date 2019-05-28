// implement your API here
// require the express npm module, needs to be added to the project using "yarn add" or "npm install"
const express = require('express');
const db = require('./data/db.js')

// creates an express application using the express module
const server = express();
server.use(express.json());

const sendUserError = (status, message, res) => {
    // This is just a helper method that we'll use for sending errors when things go wrong.
    res.status(status).json({ errorMessage: message });
    return;
  };

// configures our server to execute a function for every GET request to "/"
// the second argument passed to the .get() method is the "Route Handler Function"
// the route handler function will run on every GET request to "/"
server.get('/', (req, res) => {
  // express will pass the request and response objects to this function
  // the .send() on the response object can be used to send a response to the client
  res.send('Hello World');
});

server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({
             error: "The users information could not be retrieved." 
        });
    });
});

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params
    db.findById(id)
    .then(user => {
        if (user.id) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: "The user information could not be retrieved."
        })
    })

})

server.post('/api/users', (req, res) => {
    const {name, bio} = req.body;
    const userInfo = req.body;
    if (!name || !bio ) {
        res.status(400).json({ 
            errorMessage: "Please provide name and bio for the user." 
        })
    }
    else {
    db.insert(userInfo)
    .then(users => {
            res.status(201).json(users)
        })
    .catch(err => {
        res.status(500).json({
             error: "There was an error while saving the user to the database" 
        })
    })}
})


server.delete('/api/users/:id', (req, res) => {
    const {id } = req.params
    db.remove(id)
    .then(deleted => {
        if (deleted) {
            res.status(204).end();
        }
        else {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        }
    })
    .catch(err => {
        res.status(500).json({
             error: "The user could not be removed" 
        })
    })
})

server.put('/api/users/:id', (req, res) => {

})


// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts
server.listen(8000, () => console.log('API running on port 8000'));