

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
    // GET    /api/users    Returns an array of all the user objects contained in the database.
    console.log('get root');
    database.find()
    .then(data => {
        response.status(200)
        response.json(data);
    })
    .catch(error => {
        response.status(500);
    })
    .finally(() => next());
});

//-- Get a User by Id ----------------------------
users.get('/:id', function (request, response, next) {
    // GET    /api/users/:id    Returns the user object with the specified id.
    console.log('get by id');
    const userId = request.params.id;
    database.findById(userId)
    .then(data => {
        if(!data){
            response.status(404);
            return;
        }
        response.status(200);
        response.json(data);
    })
    .catch(error => {
        response.status(500);
    })
    .finally(() => next());
});

//-- Create a User -------------------------------
users.post('/', function (request, response, next) {
    // POST    /api/users    Creates a user using the information sent inside the request body.
    console.log('post root');
    next();
});

//-- Delete a User -------------------------------
users.delete('/:id', function (request, response, next) {
    // DELETE    /api/users/:id    Removes the user with the specified id and returns the deleted user.
    console.log('delete by id');
    next();
});

//-- Update a User -------------------------------
users.put('/:id', function (request, response) {
    // PUT    /api/users/:id    Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.
    console.log('put by id');
    next();
});

//-- Methods provided by database ----------------
/*
    find()
    findById(id)
    insert(user)
    update(id, user)
    remove(id)
*/
