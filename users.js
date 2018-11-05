

//== User Routing ==============================================================

//-- Dependencies --------------------------------
const express = require('express');
const database = require('./data/db.js');

//-- Create route handler, then export -----------
const users = express();
module.exports = users;


//== Route Handlers ============================================================

//-- Get all Users -------------------------------
users.get('/', function (request, response, next) {
    // Retrieve all users from database, then send to user
    database.find()
    .then(data => {
        response.status(200);
        response.json(data);
    })
    // Inform user of failure (database error)
    .catch(error => {
        response.status(500);
        response.json({
            error: "The users information could not be retrieved.",
        });
    })
    // Pass to next middleware
    .finally(() => next());
});

//-- Get a User by Id ----------------------------
users.get('/:id', function (request, response, next) {
    // Attempt to find user-data in database
    const userId = request.params.id;
    database.findById(userId)
    .then(data => {
    // Inform the user if the requested data was not found
        if(!data){
            response.status(404);
            response.json({
                message: "The user with the specified ID does not exist.",
            });
            return;
        }
    // Send the requested data
        response.status(200);
        response.json(data);
    })
    // Inform user of failure (database error)
    .catch(error => {
        response.status(500);
        response.json({
            error: "The user information could not be retrieved.",
        });
    })
    // Pass to next middleware
    .finally(() => next());
});

//-- Create a User -------------------------------
users.post('/', function (request, response, next) {
    // Check for ill-formed request
    if(!request.body.name || !request.body.bio){
        response.status(400);
        response.json({
            errorMessage: "Please provide name and bio for the user."
        });
        response.next();
        return;
    }
    // Construct data from request
    let userData = {
        name: request.body.name,
        bio : request.body.bio ,
    };
    // Insert new user into database
    database.insert(userData)
    // Inform user of success
    .then(data => {
        response.status(201);
        response.json(data);
    })
    // Inform user of failure (database error)
    .catch(error => {
        response.status(500);
        response.json({
            error: "There was an error while saving the user to the database"
        });
    })
    // Pass to next middleware
    .finally(() => next());
});

//-- Delete a User -------------------------------
users.delete('/:id', function (request, response, next) {
    // Attempt to remove identified user from database
    const userId = request.params.id;
    database.remove(userId)
    // Handle situations where specified user does not exist
    .then(success => {
        if(!success){
            response.status(404);
            response.json({
                message: "The user with the specified ID does not exist.",
            });
            return;
        }
    // Respond successfully
        response.status(204);
    })
    // Inform user of failure (database error)
    .catch(error => {
        response.status(500);
        response.json({
            error: "The user could not be removed",
        });
    })
    // Pass to next middleware
    .finally(() => next());
});

//-- Update a User -------------------------------
users.post('/:id', function (request, response, next) {
    // Check for ill-formed request
    if(!request.body.name || !request.body.bio){
        response.status(400);
        response.json({
            errorMessage: "Please provide name and bio for the user."
        });
        response.next();
        return;
    }
    // Construct data from request
    let userData = {
        name: request.body.name,
        bio : request.body.bio ,
    };
    // Attempt to updated user data in database
    const userId = request.params.id;
    database.update(userId, userData)
    .then(success => {
    // Handle situations where specified user does not exist
        if(!success){
            response.status(404);
            response.json({
                message: "The user with the specified ID does not exist.",
            });
            return;
        }
    // Inform of success
        response.status(200);
        response.json(data);
    })
    // Inform user of failure (database error)
    .catch(error => {
        response.status(500);
        response.json({
            error: "The user information could not be modified.",
        });
    })
    // Pass to next middleware
    .finally(() => next());
});
