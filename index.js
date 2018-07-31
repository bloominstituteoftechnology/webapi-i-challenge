//ASSIGNMENT: Use Node.js and Express to build an API that performs CRUD operations on users.

//we use require() to import the express module and make it available to our application. This is similar to the import keyword we have used before. 
const express = require('express'); 

//The return of calling express() is an instance of an Express application that we can use to configure our server and, eventually, start “listening” and responding to requests. 
const server = express();

// We are using the .get() method to set up a route handler function that will be executed on every GET request to the URL specified as the first parameter, in this case the root of the site (represented by a /). 

// The first two arguments passed by express to a route handler function are: an object that represents the request and another object that represents the response. 
// Express augments those objects with a set of useful properties and methods. Our example uses the .send() method of the response object to specify the data sent to the client as the response body. 

server.get('/', (req, res) => {
    res.send('Hello World');
});

let db = require('./data/db')



// The .find() method returns a promise, so make sure to send 
// the response after that promise has resolved and, in case 
// of failure, return a status code of 500 and an error message 
// back to the client.
//
// function find() {
//     return db('users');
//   }

// server.get('/api/users', (req,res) => {
//     let users = db.find()
//     res.send(users);
// })

const promise = db.find()



server.get('/api/users', (req,res) => {
    db.find()
        .then(res.send(db.find()))
})



// Below we code a new endpoint that returns an array of movie characters in JSON format. 
// The first step is to define a new route handler to respond to GET requests to /hobbits.
server.get('/hobbits', (req, res) => {
    //Next, we define the data that our endpoint will return inside the newly defined route handler function.
    const hobbits = [
        {
            id: 1,
            name: 'Samwise Gamgee',
        },
        {
            id: 2,
            name: 'Frodo Baggins',
        },
    ];

    // We should provide as much useful information as possible to the clients using our API. One such piece of information is the HTTP status code that reflects the outcome of the operation the client is trying to perform. The .status() method of the response object can be used to send any valid HTTP status code.
    // We are also chaining the .json() method of the response object to clearly communicate to both the client making the request, but most importantly, to the next developer working with this code, that the we intend to send the data in JSON format.
    res.status(200).json(hobbits);
});


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



