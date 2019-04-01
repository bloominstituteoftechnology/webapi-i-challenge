// implement your API here
const express = require('express')

const db = require('./data/db')

const server = express();

server.use(express.json())

server.get('/', (req, res) => {
    res.send('...api is running...')
})

server.get('/api/users', (req, res) => {
    const users = db.users

    .find()
    .then(users => {
        res.json({users})
    })
    .catch(({ code, message }) => {
        res.status(505).json({
            success: false,
            error: "The user information could not be retrieved."
        })
    })
})

server.get('/api/users/:id', (req, res) => {
    db.users
    .findById(req.params.id)
    .then(user => {
        if (user.length === 0) {
            res.status(404).json({
                success: false,
                message: "The user with the specified ID does not exist."

            }) 
            .catch(({ code, message }) => {
                res.status(500).json({
                    success: false,
                    error: "The user information could not be retrieved."
                })
            }) 
        }
    })
})

server.post('/api/users', (req, res) => {
    const { name, bio, created_at, updated_at } = req.body;

    if (!name || !bio) {
        res.status(400).json({ 
            success: false, 
            errorMessage: "Please provide name and bio for the user." 
        })
    } else {
        db.add({name, bio, created_at, updated_at
        })
        .then(res => {
            res.status(201).json({
                success: true,
                res,
        })
        .catch(({code, message }) => {
            res.status(500).json({
                success: false,
                error: "There was an error while saving the user to the database"
            })
        })
        })
    }
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    db.users
    .remove(id)
    .then(deleted => {
        if (deleted === 0) {
            res.status(404).end({
                success: false,
                message: "The user with the specified ID does not exist."
            }) 
            .catch(({ code, message }) => {
                res.status(500).json({
                    success: false,
                    error: "The user could not be removed"
                })
            }) 
        }
    })
})

server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const{user, bio} = req.body;
    if (id === 0) {
        res.status(404).json({
            success: false,
            message: "The user with the specified ID does not exist."
        })
        db.update(name, bio, {id})
        .then(res => {
            if (!name || !bio, res) {
                res.status(400).json({
                    success: false,
                    errorMessage: "Please provide name and bio for thr user"
                })
                .catch(({code, message}) => {
                    res.status(500).json({
                        success: false,
                        message: "The user information could not be modified."
                    })
                })  
            } else {
                if (user) {
                res.status(200).json({
                    success: true,
                    message,    
                });
                return; 
            }
        }
    })
}});


server.listen(3000, () => {
  
    console.log('/n*** Server running on port 3K ***/n')
})