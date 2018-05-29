const express = require('express');
const db = require('./data/db');
const server = express();

var port = 5555;

server.use(express.json());

server.get('/', (req,res) => {
  res.send("hello from other side");
})

server.post('/api/users', (req,res) => {
  const { name,bio } = req.body;
  db.insert({name, bio})
  .then(response => {
    console.log(response);
    res.json(response);
  })
  .catch(error => {
    res.json({error});
  })
})

server.get('/api/users', (req, res) => {
  db
    .find()
    .then(users => {
      res.json({ users });
    })
    .catch(error => {
      res.json({ error });
    });
});


server.get('/api/users/:id', (req, res) => {
  const { id }  = req.params;
  db.
  findById(id)
  .then(users => {
    res.json({ users });
  })
  .catch(error => {
    res.json({ error });
  });
  // pull id off of req.params;
  // invoke proper db.method(id) passing it the id.
  // handle the promise like above
});

server.delete('/api/users/:id', (req, res) => {
  const { id }  = req.params;
  db.
  remove(id)
  .then(users => {
    res.json({ users });
  })
  .catch(error => {
    res.json({ error });
  });
  // pull id off of req.params;
  // invoke proper db.method(id) passing it the id.
  // handle the promise like above
});


server.put('/api/users/:id', (req, res) => {
  const { id }  = req.params;
  const { name,bio } = req.body
  db.
  update(id, { name,bio })
  .then(users => {
    res.json({ users });
  })
  .catch(error => {
    res.json({ error });
  });
  // pull id off of req.params;
  // invoke proper db.method(id) passing it the id.
  // handle the promise like above
});


server.listen(port, () => console.log(`server running on port ${port}`))
