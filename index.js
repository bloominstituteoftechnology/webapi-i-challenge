// implement your API here
const express = require('express');

//other files
const db = require('./data/db');

//global object
const server = express();

//middleware 
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello World');

})

server.use(express.json());




//getting all the data
server.get('/db', (req, res) => {
    db.find()
        .then(db => {
            res.json(db);
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'DB doesnt exist'
            })
    })

})

//posting things because I can
server.post('/db', (req, res) => {
    const newDB = req.body;

    db.insert(newDB)
        .then(newUser => {
            if(newUser){
                // res.status(201).json(db);
                const { id } = newUser;
                db.findById(id)
                    .then(data => {
                    res.status(200).json(data)
                })
                                
            }
            else {
                res.status(404).json({
                    message:'Invalid DB'
                })  
            }
        })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'Failed to create new DB'
        })
    })
})

server.delete('/db/:id', (req, res) => {
    
    const { id } = req.params;
    db.remove(id)
        .then(deletedDB => {
            if (deletedDB) {
                res.json(deletedDB);
            }
            res.status(404).json({
                message:'Invalid ID'
            })

    }) 
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'Failed to delete new DB'
            }) 
    })
})

server.put('/db/:id', (req, res) => {
    const { id } = req.params;

    const changes = req.body;
    db.update(id, changes)
        .then(updatedDB => {
            if (updatedDB) {
                res.json(updatedDB);
            } 
            res.status(404).json({
                message:'Invalid ID'
            })

        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to Update DB'
            })
    })

})

server.get('/db/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
        .then(getId => {
            if (getId) {
                res.json(getId);
            } else {
                res.status(404).json({
                    message:'Invalid DB ID'
                }) 
        }

    })
    .catch(err => {
        res.status(500).json({
            message: 'Failed to get DB'
        })
})
})

//setting the port
server.listen(4000, () => {
    console.log('Server is listening')
})