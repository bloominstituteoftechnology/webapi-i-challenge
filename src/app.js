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

const len = readWords().length;
const randomInt = Math.floor(Math.random() * len) + 1;

const word = readWords()[randomInt].split('');

const guessedWord = word.map((element) => {
  return '-';
});

const alphabet = {
  a: false,
  b: false,
  c: false,
  d: false,
  e: false,
  f: false,
  g: false,
  h: false,
  i: false,
  j: false,
  k: false,
  l: false,
  m: false,
  n: false,
  o: false,
  p: false,
  q: false,
  r: false,
  s: false,
  t: false,
  u: false,
  v: false,
  w: false,
  x: false,
  y: false,
  z: false,
};

const guessLetter = (letter) => {
  if (alphabet[letter] === true) {
    return 'Already Guessed, guess again.';
  }
  const index = word.forEach((wordLetter, i) => {
    if (letter === wordLetter) {
      guessedWord[i] = word[i];
    }
  });
  alphabet[letter] = true;
  return guessedWord.join('');
};

server.post('/guess', (req, res) => {
  const { letter } = req.body;
  if (letter) {
    const anotherword = guessLetter(letter);
    res.status(200);
    res.send(anotherword);
  } else {
    res.status(404);
    res.send({ error: 'Bad guess, guess again.' });
  }
});

server.get('/guess', (req, res) => {
  const guessed = guessedWord.join('');
  res.status(200);
  res.send({
    wordSoFar: guessed,
    guesses: alphabet
  });
});

// TODO: your code to handle requests

server.listen(3000);
