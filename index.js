// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());


//Create or POST
server.post('/api/users', (req, res) => {
    const newUser = req.body;
    const {name, bio} = req.body;

    if (name && bio) {

        db.insert(newUser)
        .then(addedUser => {
             res.status(201).json(addedUser)
        })
        .catch( err =>  { 
            res.status(500).json({ error: "There was an error while saving the user to the database"})
        })

    } else {

            res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }

})

//Read or GET
server.get('/', (req, res) => {
    res.send('Hello World!')
})

server.get('/api/users', (req, res) => {
    db.find()
    .then( 
        allUsers => {
        if(allUsers) {
            res.json(allUsers)
        } else {
            res.status(500).json({error: "The users information could not be retrieved."})
        }
        
    })
})

//GET by ID
server.get('/api/users/:id', (req, res) => {
    const {id} = req.params
    db.findById(id) 
        .then( foundUser => {

            if(foundUser) {
                db.findById(id).then( res.status(201).json(foundUser))
            } else {
                res.status(404).json( { error: "The user with the specified ID does not exist." })
            }   
        })
    .catch(err =>{
        res.status(404).json({ error : err, message: 'The user information could not be retrieved'})
     })

    
})


//Delete

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params
    db.remove(id)
    .then( deletedUser => {
        if (deletedUser) {
            db.remove(id).then(res.status(201).json(deletedUser))
        } else {
            res.status(404).json( { error: "The user with the specified ID does not exist." })
        }
    })
    .catch(err => {
        res.status(500).json({error: "The user could not be removed"})
    })
})
server.listen(3333, () => console.log(`Listening on port 3333`))