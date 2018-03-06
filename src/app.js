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

const wordsList = readWords();

const finalWord = wordsList[Math.floor(Math.random() * wordsList.length)];

const hiddenWord = finalWord.split('').map((letter) => {
  return '-';
});

const uncoverLetter = (guess) => {
  for (let i = 0; i < hiddenWord.length; i++) {
    if (finalWord[i] === guess) {
      hiddenWord[i] = finalWord[i];
    }
  }
  return hiddenWord.join(' ');
};

const guesses = [];
let currentGuess = '';

server.post('/guess', (req, res) => {
  if (!req.body.letter || req.body.letter.length > 1) {
    res.status(422);
    res.send({ error: 'Error message' });
    return;
  }
  if (guesses.includes(req.body.letter)) {
    res.send({ error: 'already guessed' });
  }
  guesses.push(req.body.letter);
  currentGuess = req.body.letter;
  res.send(' ');
});

server.get('/guess', (req, res) => {
  res.send({ wordSoFar: uncoverLetter(currentGuess), guesses: guesses });
});

server.listen(3000);
