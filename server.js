const express = require('express');
const db = require('./data/db')

const port = 5555
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  // ist arg: route where the resourse can be interacted with
  // 2nd arg: cb to deal with cending responses
  res.send('Hello from express');
});

server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;
  
  db
    .insert({ name, bio })
    .then(response => {
      res.status(201).json(response)
      // console.log(response)
    })
    .catch(error => {
      res.json(error);
    });
});

server.get('/api/users', (req, res) => {
  
  db.find().then(users => {
    res.json({ users })
  })
  .catch(error => {
    res.json({error});
  })
})

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  console.log(id)
  db.findById(id).then(user => {
    res.json({user})
  })
  .catch(error => {
    res.json({error})
  })
})

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id).then(user => {
    res.json({ user })
  })
  .catch(error => {
    res.json({ error })
  })
})

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  db.update(id, { name, bio }).then(user => {
    res.json({ user })
  })
  .catch(error => {
    res.json({ error })
  })
})


server.listen(port, () => console.log(`server running on port ${port}`));