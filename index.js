const express = require('express');
const db = require('./data/db');

const app = express();

app.get('/', (_, res) => res.send('Hello world'));

app.get('/api/users', async (req, res) => {
  try {
    let data = await db.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(3000, () =>
  console.log('\n Server listeneing on port 3000 \n === \n'),
);
