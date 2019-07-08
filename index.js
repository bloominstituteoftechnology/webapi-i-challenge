// implement your API here

//Bring express and create express app
const express = require('express');
const server = express();
const Hub = require('./data/db');

//Config the express app
server.use(express.json());

//Create endpoints with 
server.get('/api/users', (req, res) => {
    Hub.find()
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        console.log('sad');
        res.json(error);
      });
})

server.get('/api/users/:id', (req, res) => {

const id = req.params.id

    Hub.findById(id)
    .then(data => {
       if(id){res.status(200).json(data)}else{
         return res.data(200).json([])
       } 
    })
    .catch(error => {
        console.log('error');
        res.json(error);
      });
})

server.post('/api/users', (req, res) => {
    const newUser = req.body

    if(newUser.name && newUser.bio){
        Hub.insert(newUser)
        .then(user => {
            Hub.findById(user.id)
            .then(user => {
                res.json(user).status(201)
            })
        })
        .catch(error => {
            res.status(500).json(
                {error: "There was an error while saving the user to the database", error})
        })
    }else{
        res.status(400).json(
            {errorMessage: "Please provide name and bio for the user."})
    }
    
})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id
    const updatedUser = req.body      

    if(updatedUser.name && updatedUser.bio){
        Hub.update(id, updatedUser)
        .then(user => {
            if(user){
                Hub.findById(id)
                .then(user => {
                    res.json(user).status(200)
                })
            }else{
                res.status(404).json({message: "The user with the specified ID does not exist."})
            }
        }) 
        .catch(error => {
            res.status(500).json(
                {error: "The user information could not be modified.", error})
        }) 
    }else{
        res.status(400).json(
            {errorMessage: "Please provide name and bio for the user."})
    }

})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    Hub.remove(id)
    .then(user => {
        if(user){
            Hub.find()
            .then(users => {
                res.status(200).json(users)
            })
        }else{
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The user could not be removed", error })
    })
})
  


server.listen(3000, () => {
    console.log('listening on 3000')
})