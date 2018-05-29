const express = require('express');
const db = require('./data/db');



const port = 5000;
const server = express();
server.use(express.json());
                 //homies
server.get('/', (req, res) => {
// 1st arg: route where a resource can be interacted with
  // 2nd arg: callback to deal with sending responses, and handling incoming data.
    res.send('Hello from express');
});

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    db
        .insert({ name, bio })
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            res.json({ error });
        });
    //do something with
});
    server.get('/api/users', (req, res) =>{
        db
        .find()
                .then(users => {
                    res.json({ users });
                })
                .catch(error => {
                    res.json({ error });
                    //do something with error
            });
        server.get('/api/users/:id', (req, res) => {
            //grab the id fromurl parameters
            const id = req.params.id;
            
            db
                .findById(id)
                .then(user => {
                    res.json(user);
                })
                .catch(err => {
                    //do something with error
                });
        })
        // function findById(id) {
        //     return db('users').where({ id: Number(id) });
       // }
        // function insert(user) {
        //     return db('users')
        //         .insert(user)
        //    function update(id, user) {
        //     return db('users')
        //         .where('id', Number(id))
        //         .update(user);
        // }     .then(ids => ({ id: ids[0] }));
        // }
        // 
        // function remove(id) {
        //     return db('users')
        //         .where('id', Number(id))
        //         .del();
        // }
});
// pull id off of req.params;
  // invoke proper db.method(id) passing it the id.
  // handle the promise like above
server.listen(port, () => console.log('Server running on port '));
