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

    db
        .findById(id)
        .then(users => {
            if (users.length === 0) {
                res.status(404).json({ message: 'user not found' });
            } else {
                res.json(users[0]);
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
})

server.post(`/api/users`, (req, res) => {
    const userInfo = req.body;
    console.log(`userInfo`, userInfo);

    db
        .insert(userInfo)
        .then(response => {
            res.status(201).json(response);
        } )
        .catch(err => {
            if (err.errno === 19) {
                res.status(400).json({ msg: 'Please provide all required fields.'})
            } else {
                res.status(500).json({ error: err});
            }
        });
});


// quiry string as parameter example below:
    // http://foo.com?search=bar&sort=asc
        // req.query === { search: 'bar', sort: 'asc' }

// http://Localhost:5000/api/users?id=1 // just to use req.query

// server.delete(`/api/users`, (req, res) => {
//     const { id } = req.query;
//     let user;

//     db
//     .findById(id)
//     .then( foundUser => {
//         user = { ...foundUser }; //...foundUser is shallow copy
    
//        db.remove(id)
//         .then(response => {
//             res.status(200).json(user);
//          })
//         })
//         .catch(err => {
//         res.status(500).json({ error: err});
//     })
// })


// Delete written using a URL paramenter instead /api/users/:id

server.delete(`/api/users/:id`, (req, res) => {
    const { id } = req.params;
    let user;

    db
    .findById(id)
    .then( foundUser => {
        user = { ...foundUser }; //...foundUser is shallow copy
    
       db.remove(id)
        .then(response => {
            res.status(204).json(user);
         })
        })
        .catch(err => {
        res.status(500).json({ error: err});
    })
})

server.put(`/api/users/:id`, (req, res) => {
    const { id } = req.params;
    const updateInfo = req.body;

    db.update(id, updateInfo)
        .then(count => {
            if (count > 0) {
                res.status(200).json({msg: 'Updated Successfully'})
            } else {
                res.status(404).json({msg: 'User Not Found'})
            }
        }).catch(err => {
            res.status(500).json(err);
        })
})

// server object: we have inialized it with our express server
server.listen(port, () => console.log('Server running on port ${port}'));


