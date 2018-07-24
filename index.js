const express = require('express');
const db = require('./data/db');
const app = express();

app.use(express.json());

app.get('/api/users', (req, res) => {
  db.find()
    .then(users => res.status(200).json({ users }))
    .catch(err => {
      console.log(err);
      res.status(400).json({ error: 'Unable to retrieve users' });
    });
});

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => res.status(200).json({ user }))
    .catch(err => {
      console.log(err);
      res.status(400).json({ error: 'Unable to retrieve that user' });
    });
});
app.post('/api/users', (req, res) => {
  const { name, bio } = req.body;
  const user = {
    name,
    bio
  };
  db.insert(user)
    .then(id =>
      db
        .find(id)
        .then(user => res.status(200).json({ user }))
        .catch(err => console.log(err))
    )
    .catch(err => {
      console.log(err);
      res.status(400).json({ error: 'Unable to add that user' });
    });
});
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const { name, bio } = req.body;
  const user = {
    name,
    bio
  };
  db.update(id, user)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ success: 'User successfully updated' });
      } else {
        res
          .status(400)
          .json({ failed: 'Something went wrong updating the user' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ error: 'Something went wrong updating the user' });
    });
});
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  let cached;
  db.findById(id)
    .then(user => {
      cached = user;
    })
    .then(err => console.log(err));
  db.remove(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ user: cached });
      } else {
        res
          .status(400)
          .json({ error: 'Something went wrong deleting the user' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ error: 'Something went wrong deleting the user' });
    });
});

app.listen(8000, () => {
  console.log('Server listening on PORT 8000');
});
