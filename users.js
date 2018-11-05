

//== User Routing ==============================================================

//-- Dependencies --------------------------------
const express = require('express');
const database = require('./data/db.js');

//-- Create route handler, then export -----------
const users = express();
module.exports = users;


//== Route Handlers ============================================================

//-- Get all Users -------------------------------
users.get('/', function (request, response) {
    // GET    /api/users    Returns an array of all the user objects contained in the database.
    console.log('get root');
    request.next();
});

//-- Get a User by Id ----------------------------
users.get('/:id', function (request, response) {
    // GET    /api/users/:id    Returns the user object with the specified id.
    console.log('get by id');
    request.next();
});

//-- Create a User -------------------------------
users.post('/', function (request, response) {
    // POST    /api/users    Creates a user using the information sent inside the request body.
    console.log('post root');
    request.next();
});

//-- Delete a User -------------------------------
users.delete('/:id', function (request, response) {
    // DELETE    /api/users/:id    Removes the user with the specified id and returns the deleted user.
    console.log('delete by id');
    request.next();
});

//-- Update a User -------------------------------
users.put('/:id', function (request, response) {
    // PUT    /api/users/:id    Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.
    console.log('put by id');
    request.next();
});

//-- Methods provided by database ----------------
/*
    find()
    findById(id)
    insert(user)
    update(id, user)
    remove(id)
*/
