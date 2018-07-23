const express = require('express'); //  to import the express module and make it available to our application
const db = require('./data/db.js');
const cors = require('cors');

const server = express();
const port = 3333;
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => { 
    res.send('Hello World');
  });


server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({error: "The users information could not be retrieved."})
        })
});

  server.listen(port, () => console.log(`Server is listening to port ${port}`));