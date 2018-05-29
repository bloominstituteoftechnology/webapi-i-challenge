const express = require('express'); // go find the node directory called express.
const db = require(`./data/db`);

const port = 5000;
const server = express(); // variable server calls express. Server is how we're going to build our server.
server.use(express.json()); //extending middleware into our server

//endpoint
// request object, response object ==== the homies
server.get(`/`, (req, res) => {
    // 1st arg: route where a resource can be interacted with
    // 2nd arg: callback to deal with sending responses, and handling incoming
    res.send(`Hello from express`);
})

//any data we send to /api/users will be found on the request object
server.post(`/api/users`, (req, res) => {
    const { name, bio } = req.body;
    db
    .insert({ name, bio })
    .then(response => {
        res.send(response);
    })
    .catch(error => {
        res.json(error);
    })
    //console.log(db.insert({ name, bio })); //using postman we see that this a promise
})

server.get(`/api/users`, (req, res) => {
    db
    .find().then(response => {
        db.find().then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error });
        });
    });
});

server.get(`/api/users/:id`, (req, res) => {
    //grab the id from URL parameters
    const id = req.params.id;
    console.log(`params`, req.params.id)

    db.findById(id).then(user => {
            res.json(user);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
})

server.post(`/api/users`, (req, res) => {
    const userInfo = req.body;
    console.log(`userInfo`, userInfo);

    db
        .insert(userInfo).then(response => {
            res.status(201).json(response);
        } )
        .catch(err => {
            res.status(500).json({ error: err});
        });
});

server.put(`/api/users/:id`, (req, res) => {
    const userInfo = req.params.id;
    console.log(`userInfo`, userInfo);


})

// server object: we have inialized it with our express server
server.listen(port, () => console.log('Server running on port ${port}'));


