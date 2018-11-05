

//== User Routing ==============================================================

//-- Dependencies --------------------------------
const express = require('express');

//-- Create route handler, then export -----------
const users = express();
module.exports = users;

//-- Handle Routes -------------------------------
/*
POST 	/api/users 	Creates a user using the information sent inside the request body.
GET 	/api/users 	Returns an array of all the user objects contained in the database.
GET 	/api/users/:id 	Returns the user object with the specified id.
DELETE 	/api/users/:id 	Removes the user with the specified id and returns the deleted user.
PUT 	/api/users/:id 	Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.
*/
users.get('/', function (request, response) {
    console.log('get root');
    request.next();
});
users.post('/', function (request, response) {
    console.log('post root');
    request.next();
});
users.get('/:id', function (request, response) {
    console.log('get by id');
    request.next();
});
users.delete('/:id', function (request, response) {
    console.log('delete by id');
    request.next();
});
users.put('/:id', function (request, response) {
    console.log('put by id');
    request.next();
});