
//import express from 'express'; //ES Modules

const express = require('express'); //CommonJs
//helmet is for security
const helmet = require('helmet');
//db are our functions
const db = require('./data/db');

//creating an optional port variable
const port = 3333;

//creating the server
const server = express();

// add middleware
server.use(helmet());
//This middleware (express.json()) is used to parse data coming in
server.use(express.json());

//helper function for error handling
const sendUserError = (status, message, res) => {
    res.status(status).json({errorMessage: message});
    return;
} 

// configure routing/endpoints

//HOME PAGE
server.get('/', (req, res) => {
    //res.send('<h1>Hello World</h1>');
    res.send({ hello: 'world' });
})
//GET ALL USERS
server.get('/api/users', (req, res) => {
    const { user } = req.body
    db
        .find()
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'The users information could not be retrieved.' })
            return;
        })
})
//GET USER (BY ID)
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id ;
    db
        .findById(id)
        .then(users => {
            if (users.length === 0) {
                res.status(404).json({ message: 'The user with the specified ID does not exist.' });
                return;
            }
            res.json({ users })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'The user information could not be retrieved.' })
            return;
        })
})
//POST - CREATE NEW USER
    //pseudo code logic
        // CREATE GATE
        //     ELSE RELAY ERROR MESSAGE
        //         RETURN newUser
server.post('/api/users', (req, res) => {
    const { name, bio } = req.body ;
    const newUser = { name, bio } ;

    if (newUser.name == null || newUser.bio == null) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."});
        return;
    }
    db
    .insert(newUser)
    .then(response => {
        res.status(201).json(response)
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({error: "There was an error while saving the user to the database"});
        return;
    })    
})
//DELETE	/api/users/:id	Removes the user with the specified id and returns the deleted user.
server.delete('/api/users/:id', (req, res) => {
   const { id } = req.params; 
    db
        .remove(id)
        .then(response => {
            if (response === 0) {
                res.status(404).json({message: "The user with the specified ID does not exist."});
                return;
            }
            res.json({ success: `User with the id: ${id} removed from system`});
        })
        .catch(error => {
            console.log(error)
            //first use of helper func below
            sendUserError(500, 'The user could not be removed', res);
            return;
        })   
})

//PUT - UPDATE	/api/users/:id	Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;

    if(!name || !bio) {
        res.status(400).jsonp({ errorMessage: "Please provide name and bio for the user.", });
        return;
    }
    db
        .update(id, { name, bio })
        .then(response => {
            if (response === 0) {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
                return;
            }
            db
                .findById(id)
                .then(user => {
                    if (user.length === 0) {
                        res.status(404).json({ message2: "(NESTED) The user with the specified ID does not exist." });
                        return;
                    }
                    res.json(user);
                })
                .catch(error => {
                    res
                        .status(500)
                        .send({ message: "(NESTED) The user information could not be modified.", error: error.message })
                })
        })//end of main .then
        .catch(error => {
            res
                .status(500)
                .send({ message: "The user information could not be modified.", error: error.message });
                return;
        })
})//end of server.put




//data shape
// {
//     users: [
//         {
//         id: 1,
//         name: "AtokiBot",
//         bio: "CS8 Student at Lambda School",
//         created_at: "2018-04-02 19:01:14",
//         updated_at: "2018-04-02 19:01:14"
//         },
//         {
//         id: 2,
//         name: "GeekBot",
//         bio: "CS8 Student at Lambda School",
//         created_at: "2018-04-02 19:01:14",
//         updated_at: "2018-04-02 19:01:14"
//         }
//     ]
// }
server.listen(port, () => console.log(`API running...on port ${port}`));