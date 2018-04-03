const express = require('express');

//const bodyParser = require('body-parser'); I will use express.json() instead

const morgan = require('morgan');

const helmet = require('helmet');

const db = require('./data/db.js');


const server = express();
// middleware
server.use(morgan('dev'));
server.use(helmet());

//server.use(bodyParser.json()); using express.json() instead
server.use(express.json());

// root url
server.get('/', function(req, res) {
  res.json({ api: 'Running...' });
});

// get users
/*
server.get(`/api/users`, (req, res) =>{
    // get the data
    db
    .find()
    .then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500)
        .json({errorMessage: `Could not find users`}); //
    });
});
*/

// get users with explained checks
server.get(`/api/users`, (req, res) => {
    db
        .find()
        .then(users => {
            if(users.length > 0){ // checks if any users were found
                res
                    .status(200)
                    .json(users);
            }else{
                res
                    .status(404)
                    .json({ message: `No posts found!` }); // no users found
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: `The users could not be retrieved.` }); // database error
        });
});

// get user
/*
server.get(`/api/users/:id`, (req, res) =>{
    const { id } = req.params;
    db
    .findById(id)
    .then(users => {
        res.json(users[0]);
    }).catch(err => {
        res
        .status(500)
        .json({ message: `The user with the specified ID does not exist.` });
    });
});
*/
//get by id
server.get(`/api/users/:id`, (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(user => {
            if(user.length > 0){
                res
                    .status(200)
                    .json(user[0]); // result is an array with one result, send it as an object
            }else{
                res
                    .status(404)
                    .json({ message: `The user does not exist.` }); // user doesn't exist
            }
        })
        .catch(err => {
            res
            .status(500)
            .json({ error: `The user information could not be retrieved. Internal server error!` }); // database error
        });
});


// post user
server.post(`/api/users`, (req, res) =>{
    const newUser = req.body ? req.body : {}; // checks that the body is not undefined!

    if(newUser.name === undefined || newUser.bio === undefined) {
        res.status(400);
        res.json ({ errorMessage: `Please provide name and bio for the user.` })
        return; // important!, terminates the process
    }

    db
        .insert(newUser)
        .then(response => {
            db
                .findById(response.id)
                .then(user => {
                    if(user.length > 0){
                        res
                            .status(200)
                            .json(user[0]); // result is an array with one result, send it as an object
                    }else{
                        res
                            .status(404)
                            .json({ message: `The user was not created.` }); // user doesn't exist, so was not created
                    }
                });
        }).catch(err => {
            res
                .status(500)
                .json({error: `There was an error while saving the user to the database`}); // database err
        });
});

//put
server.put(`/api/users/:id`, (req, res) => {
    const { id } = req.params;
    const userUpdates = req.body ? req.body : {};
    // update
    db
        .update(id, userUpdates)
        .then(count => {
            if(count > 0){
                // update done
                db
                .findById(id)
                .then(updatedUser => {
                    if(updatedUser.length > 0){
                        res
                            .status(200)
                            .json(updatedUser[0]); // result is an array with one result, send it as an object
                    }else{
                        res
                            .status(400) // check if this is correct?
                            .json({ message: `Error encountered` }); // update occured but an error happened
                    }
                });
            }else{
                res
                    .status(404)
                    .json({ message: `The user was not updated.` }); // nothing was updated
            }
        })
        .catch(error => {
            res 
                .status(500)
                .json({ error: `The user information could not be modified.` }); // database error
            return;
        });
});

//delete
server.delete(`/api/users/:id`, (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(response => {
            if(response.length > 0){
                // make a copy of the user
                const user = { ...response[0] };
                db
                    .remove(id)
                    .then(count => {
                        res
                            .status(200)
                            .json(user); // send the user deleted back with the response
                    })
            }else{
                res
                    .status(404)
                    .json({ message: `The user was not deleted.` }); // user doesn't exist?? somehow!!
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: `The user could not be removed. Internal server error!` }); // database error
        });  
});

const port = 5000;
server.listen(port, () => console.log(`API running on port ${port}`));
