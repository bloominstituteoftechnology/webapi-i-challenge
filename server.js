const express = require('express')
const db = require('./data/db')
const port = 5000;
const server = express()
const cors = require('cors')


// Middleware

server.use(cors());
server.use(express.json())
server.get('/', (req, res) => {
    // 1st arg: route where a resource can be interacted with
    //2nd arg: callback to deal with sending resonses, and handling incoming
    res.send('Hello from express')
})

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body
    if (title === undefined || contents === undefined) {
        res.status(400).json("BAD REQUEST")
    } else {
        db
            .insert({ name, bio })
            .then(response => {
                res.status(201).json(response)
            })
            .catch(error => {
                res.status(500).json({ error: "There was an error while saving the user to the database" })
            })
    }
})

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(response => {
            if (response.length === 0) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else {
                res.json(response)
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The users information could not be retrieved." })
        })
})

server.put('/api/users/:id', (req, res) => {
    const { name, bio } = req.body
    const id = req.params.id
    db
        .update(id, { name, bio })
        .then(res => {
            db.findById(id)
                .then(result => {
                    res.status(200).json(result)
                })
                .catch(err => {
                    res.status(500).json({ error: "The user information could not be retrieved." })
                })
        })
        .catch(error => {
            res.status(500).json({ error: "The user information could not be modified." })
        })
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    db.findById(id)
        .then(result => {
            if (result.length === 0) {
                res.status(404).json({ message: "YOU WILL NOT FIND THIS IN HERE! " })
            } else {
                db.remove(id)
                    .then(count => {
                        res.json(result)
                    })
                    .catch(error => {
                        res.stats(500).json({ error: "The post could not be removed" })
                    })
            }
        })
        .catch(error => {
            res.stats(500).json({ error: "The post information could not be retrieved." })
        })
})


server.listen(port, () => console.log(`server running on port ${port}`))