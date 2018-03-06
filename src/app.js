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

const words = readWords();
const word = words[Math.floor(Math.random() * words.length)];
const guesses = {};
// TODO: your code to handle requests

server.get('/', (req, res) => {
  const ourWord = word.split('').map((letter) => {
    if (guesses[letter]) {
      return letter;
    }
    return '-';
  }).join('');
  res.json({ ourWord, guesses });
});

server.post('/guess', (req, res) => {
  const { letter } = req.body;
  if (!letter) {
    res
      .status(STATUS_USER_ERROR)
      .json({ error: 'you must provide a letter to guess' });
    return;
  }
  if (letter.length !== 1) {
    res
      .status(STATUS_USER_ERROR)
      .json({ error: 'you must guess a single letter' });
    return;
  }
  if (guesses[letter]) {
    res
      .status(STATUS_USER_ERROR)
      .json({ error: `you already guesses the letter ${letter}` });
    return;
  }
  guesses[letter] = true;
  res.json({ guesses });
});

server.listen(3000);
