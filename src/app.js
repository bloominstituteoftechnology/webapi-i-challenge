const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const STATUS_USER_ERROR = 422;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

/* Returns a list of dictionary words from the words.txt file. */

const readWords = () => {
  const contents = fs.readFileSync('words.txt', 'utf8');
  return contents.split('\n');
};

// TODO: your code to handle requests

const words = readWords();
const word = words[Math.floor(Math.random() * words.length)];
const guesses = {};

server.get('/guess', (req, res) => {
  const wordSoFar = word.split('').map((char) => {
    if (guesses[char]) {
      return char;
    }
    return '-';
  }).join('');
  res.json({ wordSoFar, guesses });
});


server.post('/guess', (req, res) => {
  const letter = req.body.letter;
  if (!letter) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Error message' });
  }
  if (guesses[letter]) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: `${letter} has been guessed already` });
    return;
  }
  guesses[letter] = 'You guessed a letter :)';
  res.json({ guesses });
});

server.listen(3000);


// server.get('/greet/:name', (req, res) => {
//   const name = req.params.name;
//   if (!name) {
//     res.status(STATUS_USER_ERROR);
//     res.json({ error: 'Must Provide a name' });
//     return;
//   }
//   res.send(`<h1> Hello ${name} </h1>`);
//   // use http://localhost:3000/greet?name=maxc on postman
//   // with req.params.name use  http://localhost:3000/greet/Max
// });
//
//
// server.get('/', (req, res) => {
//   fs.readFile('index.html', 'utf8', (err, contents) => {
//     if (err) {
//       throw err;
//     }
//     res.send(contents);
//   });
// });
//
// server.get('/lesson-plan', (req, res) => {
//   const LessonPlan = {
//     title: 'Node.js and Express',
//     tagline: 'Server-side Javascirpt',
//   };
//   // res.type('json');
//   // res.set('Content-type', 'application/json');
//   // res.send(JSON.stringify(LessonPlan));
//   res.json(LessonPlan);
// });
