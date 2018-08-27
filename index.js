const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./data/db');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (_, res) => res.send('Hello world'));

app.get('/api/users', async (req, res) => {
  try {
    let data = await db.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/api/users', async (req, res) => {
  let { name, bio } = req.body;

  try {
    if (name && bio) {
      let id = await db.insert({ name, bio });
      res.status(201).json({ id, name, bio });
    } else {
      res
        .status(400)
        .json({ errorMessage: 'Please provide name and bio for the user' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    let data = await db.findById(req.params.id);

    if (data.length > 0) {
      return res.status(200).json(data[0]);
    }

    return res
      .status(404)
      .json({ message: 'The user with the specified ID does not exist.' });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    let data = await db.remove(req.params.id);
    if (data > 0) {
      return res.json({ message: `${data} user(s) removed ` });
    }

    return res
      .status(404)
      .json({ message: 'The user with the specified ID does not exsit.' });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put('/api/users/:id', async (req, res) => {
  let { name, bio } = req.body;

  if (!name || !bio)
    return res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });

  try {
    let data = await db.update(req.params.id, { name, bio });
    if (data > 0) {
      return res.status(200).json({ message: `${data} user(s) updated ` });
    }
    res.status(404).json({
      message: 'The user with the specified ID does not exist.',
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'The user information could not be modified' });
  }
});

app.listen(3000, () =>
  console.log('\n Server listeneing on port 3000 \n === \n'),
);
