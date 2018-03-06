const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

/* Returns a list of dictionary words from the words.txt file. */
const readWords = () => {
  const contents = fs.readFileSync('words.txt', 'utf8');
  return contents.split('\n');
};

// TODO: your code to handle requests
const finalWord = readWords()[Math.floor(Math.random() * readWords().length)].toLowerCase();

const guesses = [];

// const hangman = [
//   'head',
//   'body',
//   'left arm',
//   'right arm',
//   'left leg',
//   'right leg'
// ];

const guessed = finalWord.split('').map(letter => letter = '-');

const guessing = () => finalWord.split('').map((letter, index) => {
  for (let i = 0; i < guesses.length; i++) {
    if (letter === guesses[i].toLowerCase()) {
      guessed[index] = guesses[i].toLowerCase();
    }
  }
});

server.get('/guess', (req, res) => {
  guessing();
  const wordSoFar = guessed.join('');
  res.send({ guesses, wordSoFar });
});

server.post('/guess', (req, res) => {
  const {
    letter
  } = req.body;

  if (guesses.includes(letter)) {
    res.status(STATUS_USER_ERROR).send({ error: 'You have already guessed this letter.' });
  } else if (!letter) {
    res.status(STATUS_USER_ERROR).send({ error: 'Error message' });
  } else if (finalWord.includes(letter)) {
    guesses.push(letter);
    res.status(STATUS_SUCCESS).send('You guessed correctly!');
  } else if (guesses === finalWord) {
    res.status(STATUS_SUCCESS).send('Hoooorayy, you have won!');
  } else {
    guesses.push(letter);
    res.send('Try guessing again!');
  }
});

server.listen(3000);
