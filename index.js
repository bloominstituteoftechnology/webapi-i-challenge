/*
// require the express npm module, needs to be added to the project using "npm install express"
const express = require('express');

// creates an express application using the express module
const server = express();

// configures our server to execute a funcction for every GET request to '/'
// the second argument passed to the .get() method is the "Route Handler Function"
// the route handler function will run on every GET request to '/'
server.get('/', (req,res) => {
    // express will pass the request and response objects to this function
    // the .send() on the response object can be used to send a response to the client
    res.send('Hello World from index.js');
});

server.get('/hobbits', (req, res) => {
    // route handler code here
    const hobbits = [
        { id: 1, name: 'Samwise Gamgee' },
        { id: 2, name: 'Frodo Baggins' },
    ];
    res.status(200).json(hobbits);
});

// once the server is fully configured we can have it 'listen' for connections on a particular 'port'
// the callback function passed as teh second argument will run once when the server starts
server.listen(8000, () => {console.log('API running on port 8000')})
*/

// !! this is a more built out version of the API that supports full CRUD

const express = require('express');

const server = express();
server.use(express.json()); // !! IMPORTANT this teaches express to parse req.body

let id = 0
let getId = () => ++id // helper function to create auto-incrementing ids

let hobbits = [ // our fake hobbits database table
  { id: getId(), name: 'Samwise Gamgee' },
  { id: getId(), name: 'Frodo Baggins' },
];

server.get('/hobbits', (req, res) => { // GET ALL EXISTING HOBBITS
  res.status(200).json(hobbits); // 200 means "OK"
});

server.get('/hobbits/:id', (req, res) => { // GET EXISTING HOBBIT BY id
  // the desired id comes in the URL, and is found in `req.params.id`
  res.status(200).json(hobbits.find(hob => hob.id == req.params.id));
});

server.post('/hobbits', (req, res) => { // POST NEW HOBBIT
  // the desired name comes in the body, and is found in `req.body.name`
  hobbits.push({ id: getId(), name: req.body.name });
  res.status(201).json(hobbits); // 201 means "Created"
});

server.put('/hobbits/:id', (req, res) => { // PUT EXISTING HOBBIT
  // the id to update is in `req.params.id` and the desired name in `req.body.name`
  hobbits = hobbits.map(hob => hob.id == req.params.id
    ? { ...hob, name: req.body.name } : hob);
  res.status(200).json(hobbits);
});

server.delete('/hobbits/:id', (req, res) => { // DELETE EXISTING HOBBIT
  hobbits = hobbits.filter(hob => hob.id != req.params.id);
  res.status(204).json(hobbits);
});

server.listen(8000, () => console.log('API running on port 8000'));
