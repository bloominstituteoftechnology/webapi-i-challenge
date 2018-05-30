const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const db = require('./data/db.js');

const server = express();

//middleware
server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());
        //get is requesting the information
        
        //homies
// server.get('/', (req, res) => {
// // 1st arg: route where a resource can be interacted with
//   // 2nd arg: callback to deal with sending responses, and handling incoming data.
//     res.send('Hello from express');
// });
//post is the method //post is to create

// 

// (1) | GET | /api/users | Returns an array of all the user objects contained in the database.

// pull id off of req.params;
  // invoke proper db.method(id) passing it the id.
  // handle the promise like above
  const port = 5000;
server.listen(port, () => console.log('Server running on port '));
