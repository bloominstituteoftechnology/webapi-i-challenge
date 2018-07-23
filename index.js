const express = require('express');
const bodyParser = require('body-parser');
const db = require('./data/db');

const app = express();
app.use(bodyParser.json());
app.listen(8000, () => {
  console.log('starting on port 8000');
});

const errorMessages = {
  getAll: {
    database: {
      message: 'The users information could not be retrieved.',
      code: 500,
    },
  },
  getById: {
    database: {
      message: 'The user information could not be retrieved."',
      code: 500,
    },
    notFound: {
      message: 'The user with the specified ID does not exist.',
      code: 404,
    },
  },
  post: {
    incomplete: {
      message: 'Please provide name and bio for the user',
      code: 400,
    },
    database: {
      message: 'There was an error while saving the user to the database.',
      code: 500,
    },
  },
  delete: {
    notFound: {
      message: 'The user with the specified ID does not exist.',
      code: 404,
    },
    database: {
      message: 'There user could not be removed.',
      code: 500,
    },
  },
  put: {
    notFound: {
      message: 'The user with the specified ID does not exist.',
      code: 404,
    },
    database: {
      message: 'There user could not be modified.',
      code: 500,
    },
    incomplete: {
      message: 'Please provide name and bio for the user',
      code: 400,
    },
  },
};

app.post('/api/users', (req, res) => {
  const user = req.body;
  if (!user.name || !user.bio || user.name === '' || user.bio === '') {
    const { code, message } = errorMessages.post.incomplete;
    res.status(code).json(message);
    return;
  }
  const dBPromise = db.insert(req.body);
  dBPromise
    .then((resolve) => {
      const payload = req.body;
      res.status(201).json(payload);
    })
    .catch((err) => {
      const { message, code } = errorMessages.post.database;
      res.status(code).json({ err: message });
    });
});

app.get('/api/users', (req, res) => {
  const dBPromise = db.find();
  dBPromise
    .then((resolve) => {
      const payload = resolve.map((item) => {
        const {
          name, bio, created_at, updated_at,
        } = item;
        return {
          name, bio, created_at, updated_at,
        };
      });
      res.status(200).json(payload);
    })
    .catch((err) => {
      const { message, code } = errorMessages.getAll.database;
      res.status(code).json({ err: message });
    });
});

app.get('/api/users/:id', (req, res) => {
  const dBPromise = db.findById(req.params.id);
  dBPromise
    .then((resolve) => {
      if (resolve.length === 0) {
        const { message, code } = errorMessages.getById.notFound;
        res.status(code).json({ err: message });
        return;
      }
      const {
        name, bio, created_at, updated_at,
      } = resolve[0];
      res.status(200).json({
        name, bio, created_at, updated_at,
      });
    })
    .catch((err) => {
      const { message, code } = errorMessages.getById.database;
      res.status(code).json({ err: message });
    });
});

app.delete('/api/users/:id', (req, res) => {
  const dBPromise = db.remove(req.params.id);
  dBPromise
    .then((resolve) => {
      if (resolve === 0) {
        const { message, code } = errorMessages.delete.notFound;
        res.status(code).json({ err: message });
      } else {
        res.status(200).json({ id: req.params.id });
      }
    })
    .catch((err) => {
      const { message, code } = errorMessages.delete.database;
      res.status(code).json({ err: message });
    });
});

app.put('/api/users/:id', (req, res) => {
  const {
    params: { id },
    body,
  } = req;
  const user = body;
  if (!user.name || !user.bio || user.name === '' || user.bio === '') {
    const { code, message } = errorMessages.put.incomplete;
    res.status(code).json(message);
    return;
  }
  const dBPromise = db.update(id, body);
  dBPromise
    .then((resolve) => {
      if (resolve === 0) {
        const { message, code } = errorMessages.put.notFound;
        res.status(code).json({ err: message });
      }
    })
    .then(() => {
      const dBPromise2 = db.findById(id);
      dBPromise2
        .then((resolve) => {
          const {
            name, bio, created_at, updated_at,
          } = resolve[0];
          res.status(200).json({
            name, bio, created_at, updated_at,
          });
        })
    })
    .catch((err) => {
      const { message, code } = errorMessages.put.database;
      res.status(code).json({ err: message });
    });
});
