const express = require('express');
const helmet = require('helmet');

const db = require('./data/db');  

const server = express();

// server.listen(8000, () => console.log('API running...'));

server.use(helmet());
server.use(express.json());

// post - route handlers
server.post('/api/users', (req, res) => {
    const userInformation = req.body;
    console.log('user information', userInformation);

    db
    .insert(userInformation)
    .then(response => {
        res.status(201).json(response);
    })

    .catch(err => {
        res.status(500).json({ error: err });
    });
});
// end of post

// delete
server.delete('/api/users', function(req, res) {
    const { id } = req.query;
    //let user;

    db
    .findById(id)
    .then(foundUser => {
     user = { ...foundUser[0] };   
    })

    db
    .remove(id)
    .then(response => {
        res.status(204).json(response);
    })

    .catch(err => {
        res.status(500).json({ error: err });
    });
});
// end of delete

//put
server.put('/api/users/:id', function(req, res) {
    const { id } = req.params;
    const update = req.body;
  
    db
    .update(id, update)
    .then(count => {
      if (count > 0) {
        res.status(200).json(users[0]);
      } else {
        res.status(404).json({ msg: 'user not found' });
      }
    })
  
    .catch(err => {
      res.status(500).json(err);
    });
  });//end of put
  
  server.get('/', (req, res) => {
    res.send('Api running');
  });
  
  server.get('/api/users', (req, res) => {
    //get the users
    db
      .find()
      .then(users => {
        res.json({ users });
      })
      .catch(err => {
        res.status(500).json({ error: err });
        return;
        // do something with the error
      });
  });
  
  // /api/users/123
  server.get('/api/users/:id', (req, res) => {
    // grab the id from URL parameters
    const id = req.params.id;
  
    db
      .findById(id)
      .then(users => {
        if (users.length === 0) {
          res.status(404).json({ message: 'user not found' });
        } else {
          res.json(users[0]);
        }
      })
      .catch(err => {
        // do something with the error
        res.status(500).json({ error: err });
      });
  });
  
  server.listen(8000, () => console.log('\n== API Running on port 8000 ==\n'));