const express = require('express');
const db = require('./data/db');



const port = 5000;
const server = express();


server.use(express.json());
        //get is requesting the information         //homies
server.get('/', (req, res) => {
// 1st arg: route where a resource can be interacted with
  // 2nd arg: callback to deal with sending responses, and handling incoming data.
    res.send('Hello from express');
});
//post is the method //post is to create

server.get('/api/users', (req, res) => {
        //get yhe users
        db
        .find()
                .then(users => {
                    res.json({ users });
                })
                .catch(error => {
                    res.json({ error });
                    //do something with error
            });
        
        // get returns the user object with a specified id
        server.get('/api/users/:id', (req, res) => {
            //grab the id fromurl parameters
            const id = req.params.id;

            db
                .findById(id)
                .then(user => {
                    res.json(users[0]);
                })
                .catch(error => {
                    //do something with error
                    res.status(500).json(response);
                });
        });
        //removes the user with the specified id and returns
    server.post('/api/users', (req, res) => {
        const user = req.body;
        db
            .insert(user)
            .then(response => {
                res.status(201).json(response);
            })
            .catch(error => {
                // something with erro r
                res
                    .status(500) 
                    .json({
                    error: 'There wa s an error while saving the wuser to the database',
                        
                });
            });
    });
    
    server.delete('/api/users/:id', (req, res) => {
        //grab the id fromurl parameters
        const{id}  = req.params;

        db
            .remove(id)
            .then(users => {
                res.json(user[0]);
            })
            .catch(err => {
                //do something with error
            });
    });
});
// pull id off of req.params;
  // invoke proper db.method(id) passing it the id.
  // handle the promise like above
server.listen(port, () => console.log('Server running on port '));
