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

const finalWord = readWords()[Math.floor(Math.random() * readWords().length)];

const guesses = [];
server.post('/guess', (req, res) => {
  const clientProvided = req.body;
  if (guesses.includes(clientProvided.letter)) {
    res.status(STATUS_USER_ERROR);
    res.send({ error: 'Error message, letter already chosen.' });
  } else if ((clientProvided.letter).length !== 1) {
    res.status(STATUS_USER_ERROR);
    res.send({ error: 'Error message, input not 1 char.' });
  } else {
    guesses.push(clientProvided.letter);
    res.status(STATUS_SUCCESS);
    res.send(guesses);
  }
});

server.get('/guess', (req, res) => {
  console.log(finalWord);
  console.log(finalWord.slice(0, -1).split(''));
  const wordSoFar = finalWord.slice(0, -1).split('').map((letter) => {
    if (guesses.includes(letter)) {
      return letter;
    }
    return '-';
  })
  .join('');
  res.status(STATUS_SUCCESS);
  res.send({wordSoFar, guesses});
});

server.listen(3000);
