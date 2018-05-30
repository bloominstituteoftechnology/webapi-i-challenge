const express = require('express'); // go find the node directory called express.
const db = require('./data/db');

const port = 5000;
const server = express(); // variable server calls express. Server is how we're going to build our server.
server.use(express.json()); //extending middleware into our server

//helper function for error handling 
// const sendUserError = (status, message, res) => {
//     res.status(status).json({ errorMessage: message });
//     return;
//   };

//endpoint
// request object, response object ==== the homies 
// then and catch === the bros
server.get('/api/users', (req, res) => {
    // 1st arg: route where a resource can be interacted with
    // 2nd arg: callback to deal with sending responses, and handling incoming
    db
        .find()
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'The users information could not be retrieved.'});
            // sendUserError(500, 'Must provide name and bio', res); //helper function
            // return;
        })
});

// server.get(`/api/users`, (req, res) => {
//     db
//     .find().then(response => {
//         db.find().then(users => {
//             res.json({ users });
//         })
//         .catch(error => {
//             res.json({ error });
//         });
//     });
// });

//any data we send to /api/users will be found on the request object
server.post(`/api/users`, (req, res) => {
    const { name, bio } = req.body;
    if (!name || !bio) {
        res.status(400).json({ errorMessage: 'Must provide name and bio'});
        // sendUserError(400, 'Must provide name and bio', res); //helper function
        // return; //return cancels request 
    }
    db
    .insert({ name, bio })
    .then(response => {
        res.status(201).send(response);
        return;
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({errorMessage: "There was an error while saving the user to the database"});
    })
    //console.log(db.insert({ name, bio })); //using postman we see that this a promise
})


server.get(`/api/users/:id`, (req, res) => {
    //grab the id from URL parameters
    const id = req.params.id;
    // const { id } = req.params; //deconstructed 

    console.log(`params`, req.params.id)
    //findById: this method expects an id as it's only parameter and returns the user corresponding to the id provided or an empty array if no user with that id is found. Empty array: array.length === 0;
    db
        .findById(id)
        .then(user => {
            if (user.length === 0) { 
                res.status(404).json({ errorMessage: 'The user with the specified ID does not exist.' });
                // sendUserError(404, 'User with that id not found', res); // helper function 
                // return;
            } else {
                res.json(user);
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
                res.status(400).json({ message: 'Please provide all required fields.'})
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

// server.delete(`/api/users/:id`, (req, res) => {
//     const { id } = req.params;
//     let user;

//     db
//     .findById(id)
//     .then( foundUser => {
//         user = { ...foundUser }; //...foundUser is shallow copy
    
//        db.remove(id)
//         .then(response => {
//             res.status(204).json(user);
//          })
//         })
//         .catch(err => {
//         res.status(500).json({ error: err});
//     })
// })

// delete endpoint written by Ryan
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db
      .remove(id)
      .then(response => {
        if (response === 0) {
          sendUserError(404, 'The user with the specified ID does not exist.', res);
        }
        res.json({ success: `User with id: ${id} removed from system` });
      })
      .catch(error => {
        sendUserError(500, 'The user could not be removed', res);
        return;
      });
  });

server.put(`/api/users/:id`, (req, res) => {
    const { id } = req.params;
    const updateInfo = req.body;
    // update: accepts two arguments, the first is the id of the user to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
    db.update(id, updateInfo)
        .then(count => {
            if (count > 0) {
                res.status(200).json({message: 'Updated Successfully'})
            } else {
                res.status(404).json({messageError: 'The user with the specified ID does not exist'})
            }
        }).catch(err => {
            res.status(500).json({messageError: 'The user information could not be modified.'});
        })
})

// server object: we have inialized it with our express server
server.listen(port, () => console.log('Server running on port ${port}'));


