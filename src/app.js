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
const index = Math.floor(Math.random() * words.length);

const word = words[index];
const guesses = {};

server.post('/guess', (req, res) => {
  const { letter } = req.body;
  if (!letter) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a letter' });
  }
  if (letter.length !== 1) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must guess a single letter' });
    return;
  }
  if (guesses[letter]) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: `You've already guessed ${letter}!` });
    return;
  }

  guesses[letter] = true;
  res.json({ guesses });
});

server.get('/', (req, res) => {
  const wordSoFar = word.split('')
  .map((letter) => {
    if (guesses[letter]) {
      return letter;
    }
    return '-';
  })
  .join('');
  res.json({ wordSoFar, guesses });
});

server.listen(3000);
