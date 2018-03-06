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

const wordSoFar = 'wordSoFar';
const guesses = [];

// TODO: your code to handle requests
const words = readWords();
const finalWord = words[Math.floor(Math.random() * words.length)];
console.log(finalWord);

server.get('/guess', (req, res) => {
  res.status(200);
  res.send(wordSoFar);
});

server.post('/guess', (req, res) => {
  const { letter } = req.body;
  console.log(letter);
  res.status(200);
  res.json(req.body);
});

server.listen(3000);
