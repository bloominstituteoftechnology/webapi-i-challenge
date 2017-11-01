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
const finalWord = words[index];
const guesses = {};


server.get('/', (req, res) => {
  const wordSoFar = finalWord.split('').map((letter) => {
    if (guesses[letter]) return letter;
    return '-';
  }).join('');

  res.json({ wordSoFar, guesses });
});


server.post('/guess', (req, res) => {
  const letter = req.body.letter;

  if (!letter) {
    res.status(STATUS_USER_ERROR);
    res.json('Must provide a letter');
    return;
  }

  if (letter.length > 1) {
    res.status(STATUS_USER_ERROR);
    res.json('Must guess single leter');
    return;
  }


  if (guesses[letter]) {
    res.status(STATUS_USER_ERROR);
    res.json('error: You have already guessed this letter');
    return;
  }

  guesses[letter] = true;
  res.json({ guesses });
});


server.listen(3000);
