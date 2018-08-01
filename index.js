//ASSIGNMENT: Use Node.js and Express to build an API that performs CRUD operations on users.

//we use require() to import the express module and make it available to our application. This is similar to the import keyword we have used before. 
const express = require('express');

//The return of calling express() is an instance of an Express application that we can use to configure our server and, eventually, start “listening” and responding to requests. 
const server = express();
server.use(express.json());


let db = require('./data/db');  // const or let???

//// *********** When the client makes a GET request to /api/users: ********** ////

// If there's an error in retrieving the users from the database:
// -cancel the request.
// -respond with HTTP status code 500.
// -return the following JSON object: { error: "The users information could not be retrieved." }.

server.get('/api/users', (req, res) => {
    let users = db.find();
    users
        .then(users => {
            return res.send(users);
        })
        .catch(users => {
            return (res.status(500).json({ error: "There was an error while saving user to the database" }));
        })
})

//// *********** When the client makes a GET request to /api/users/:id ********** ////

// If the user with the specified id is not found:
// -return HTTP status code 404 (Not Found).
// -return the following JSON object: { message: "The user with the specified ID does not exist." }.

// If there's an error in retrieving the user from the database:
// -cancel the request.
// -respond with HTTP status code 500.
// -return the following JSON object: { error: "The user information could not be retrieved." }.

// // findById: this method expects an id as it's only parameter and returns the user corresponding to the id provided or an empty array if no user with that id is found.
//   function findById(id) {
//     return db('users').where({ id: Number(id) });
//   }

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    // or we could destructure it like so: const { id } = req.params;
    let user = db.findById(id);
    user
        .then(user => {
            if (user.length === 0) {
                return res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
            else return res.send(user);
        })
        .catch(user => {
            return (res.status(500).json({ error: "There was an error while saving user to the database" }));
        })
})


//// *********** When the client makes a POST request to /api/users ************ ////

// Users in the database conform to the following object structure:

// {
//   name: "Jane", // String, required
//   bio: "Doe",  // String, required
//   created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, required, defaults to current date
//   updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, required, defaults to current date
// }

// If the request body is missing the name or bio property:
// -cancel the request.
// -respond with HTTP status code 400 (Bad Request).
// -return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.

// If the information about the user is valid:
// -save the new user the the database.
// -return HTTP status code 201 (Created).
// -return the newly created user document.

// If there's an error while saving the user:
// -cancel the request.
// -respond with HTTP status code 500 (Server Error).
// -return the following JSON object: { error: "There was an error while saving the user to the database" }.

// // insert: calling insert passing it a user object will add it to the database and return an object with the id of the inserted user. The object looks like this: { id: 123 }.
// function insert(user) {
//     return db('users')
//       .insert(user)
//       .then(ids => ({ id: ids[0] }));
//   }

// Creates a user using the information sent inside the request body.
server.post('/api/users', (req, res) => {
    const newUser = req.body;
    db.insert(newUser)
        .then(newUser => {
            // if (!(req.body.name) || !(req.body.bio)) {
            //     return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
            // }
            if ((req.body.name.length === 0) || (req.body.bio.length ===0)) {
                return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
            }
            else return res.status(201).json(newUser)
            // else return res.status(201).json(req.body) WHICH ONE should be returned?
        .catch(newUser => {
            return res.status(500).json({ error: "There was an error while saving the user to the database" }) //NEED TO TEST THIS
        })
    })
})

// server.post('/api/users', (req, res) => {
//     const user = req.body;
//     db.insert(user).then(user => {
//          return res.status(201).json(user)
//     })
// })

//// *************** When the client makes a DELETE request to /api/users/:id ******* ////

// If the user with the specified id is not found:
// -return HTTP status code 404 (Not Found).
// -return the following JSON object: { message: "The user with the specified ID does not exist." }.

// If there's an error in removing the user from the database:
// -cancel the request.
// -respond with HTTP status code 500.
// -return the following JSON object: { error: "The user could not be removed" }.

// // remove: the remove method accepts an id as it's first parameter and upon successfully deleting the user from the database it returns the number of records deleted.
// function remove(id) {
//     return db('users')
//       .where('id', Number(id))
//       .del();
//   }

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    db.remove(id).then(id => {
        return res.sendStatus(id.length)
    })
})



//// *************** When the client makes a PUT request to /api/posts/:id ******* ////

// If the post with the specified id is not found:
// -return HTTP status code 404 (Not Found).
// -return the following JSON object: { message: "The post with the specified ID does not exist." }.

// If the request body is missing the title or contents property:
// -cancel the request.
// -respond with HTTP status code 400 (Bad Request).
// -return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.

// If there's an error when updating the post:
// -cancel the request.
// -respond with HTTP status code 500.
// -return the following JSON object: { error: "The post information could not be modified." }.

// If the post is found and the new information is valid:
// -update the post document in the database using the new information sent in the reques body.
// -return HTTP status code 200 (OK).
// -return the newly updated post.

// // update: accepts two arguments, the first is the id of the user to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
// function update(id, user) {
//     return db('users')
//       .where('id', Number(id))
//       .update(user);
//   }

server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const user = req.body;
    db.update(id,user)
        .then(count => { 
            return res.status(200).json(count);
        })
        .catch(count => {
            return res.status(500).json({ error: "The post information could not be modified." });
        })
})



// We use the .listen() method to have the express server monitor a port on the computer for any incoming connections and respond to those we have configured. 
server.listen(8000, () => console.log('API running on port 8000'));


















//// ***************Adrian Notes *************************** ////


// //we use require() to import the express module and make it available to our application. This is similar to the import keyword we have used before. 
// const express = require('express'); 

// //The return of calling express() is an instance of an Express application that we can use to configure our server and, eventually, start “listening” and responding to requests. 
// const server = express();


// // We are using the .get() method to set up a route handler function that will be executed on every GET request to the URL specified as the first parameter, in this case the root of the site (represented by a /). 

// // The first two arguments passed by express to a route handler function are: an object that represents the request and another object that represents the response. 
// // Express augments those objects with a set of useful properties and methods. Our example uses the .send() method of the response object to specify the data sent to the client as the response body. 

// server.get('/', (req, res) => {
//     res.send('Hello World');
// });



// // Below we code a new endpoint that returns an array of movie characters in JSON format. 
// // The first step is to define a new route handler to respond to GET requests to /hobbits.
// server.get('/hobbits', (req, res) => {
//     //Next, we define the data that our endpoint will return inside the newly defined route handler function.
//     const hobbits = [
//         {
//             id: 1,
//             name: 'Samwise Gamgee',
//         },
//         {
//             id: 2,
//             name: 'Frodo Baggins',
//         },
//     ];

//     // We should provide as much useful information as possible to the clients using our API. One such piece of information is the HTTP status code that reflects the outcome of the operation the client is trying to perform. The .status() method of the response object can be used to send any valid HTTP status code.
//     // We are also chaining the .json() method of the response object to clearly communicate to both the client making the request, but most importantly, to the next developer working with this code, that the we intend to send the data in JSON format.
//     res.status(200).json(hobbits);
// });


// // We use the .listen() method to have the express server monitor a port on the computer for any incoming connections and respond to those we have configured. 
// server.listen(8000, () => console.log('API running on port 8000'));



