// // implement your API here

// //import express from 'express'; ES6 modules

// const express = require('express'); //CommonJS modules
// const db = require('./data/db.js');
// const cors = require('cors');


// const server = express(); //creates a server

// server.use(cors()); //Needed to connect to React

// const port = 9000;
// server.listen(port, () => console.log(`\n=== API running on port ${port} ===\n`));

// //Route handlers or request handler
// // server.get('/api/users', (req, res) => {
// //     res.send('Abdul Ahmad');
// // });

// server.get('/api/users', (req, res) => {
//     db.find()
//         .then(users => {
//             console.log(users);
//             res.json(users);
//         })
//             .catch(err => res.send(err));
// });
