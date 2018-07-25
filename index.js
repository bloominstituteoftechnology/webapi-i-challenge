// import express from 'express'; // ES Modules
const express = require('express'); // CommonJS
const helmet = require('helmet');
// const morgan = require('morgan');

const db = require('./data/db'); // <<<<< this

const server = express();

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    ) || 'somewhere'}`
  );

  next();
}

function atGate(req, res, next) {
  console.log(`At the gate, about to be eaten`);

  next();
}

function auth(req, res, next) {
  if (req.url === '/mellon') {
    next();
  } else {
    res.send('You shall not pass!');
  }
}


server.use(atGate);

// add middleware
// server.use(logger);
server.use(helmet());
// server.use(morgan('short'));

server.use(express.json()); // new line ============

let hobbits = [
  // moved it out here ============
  {
    id: 1,
    name: 'Frodo Baggins',
  },
  {
    id: 2,
    name: 'Bilbo Baggins',
  },
];
let nextId = 3; // new ===============

server.get('/mellon', auth, (req, res) => {
  console.log('Gate opening...');
  console.log('Inside and safe');

  res.send('Welcome Traveler!');
});

// configure routing/endpoints
server.get('/users', async (req, res) => {
  try {
    const users = await db.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'sorry we failed you', err: err });
  }

  // db.find()
  //   .then(users => {
  //     res.status(200).json(users);
  //   })
  //   .catch(err => res.status(500).json({ message: 'sorry we failed you' }));
});

server.post('/hobbits', (req, res) => {
  const hobbit = { id: nextId++, ...req.body };
  // const hobbit = req.body;
  // hobbit.id = nextId++;

  hobbits.push(hobbit);

  res.status(200).json(hobbits);
});

server.put('/hobbits/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  const format = req.query.format || 'short'; // [ s, extended ]

  // update the hobbit
});

// https://www.google.com/search   ?  q = query  &   tbs = qdr  &  tbo = 1

server.delete('/hobbits/:id', (req, res) => {
  // new ===========
  const { id } = req.params;

  hobbits = hobbits.filter(h => h.id != id);

  res.status(200).json(hobbits);
});

server.get('/', (req, res) => {
  // hobbits were here ===========
  // res.send('<h1>Hello World</h1>');

  res.send({ hello: 'world' });
});

server.get('/about', (req, res) => {
  res.send('About us');
});

server.get('/contact', (req, res) => {
  res.send('Contact Form');
});

server.get('/hobbits', auth, (req, res) => {
  const sortField = req.query.sortby || 'id'; // !== sortBy

  const response = hobbits.sort((a, b) => {
    return a[sortField] < b[sortField] ? -1 : 1;
  });

  res.status(200).json(response);
});

server.use(function(req, res) {
  res.status(404).send("Ain't nobody got time for that!");
});

server.listen(8000, () => console.log('\n=== API running... ===\n'));

// immutable operations on the hobbits
// push = nh => h => [...h, nh];
// delete = index => h => [...h.slice(0, index), ...h.slice(index + 1)]
//