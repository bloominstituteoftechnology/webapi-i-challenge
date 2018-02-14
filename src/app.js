const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const STATUS_SUCCESS = 200;
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
const word = words[Math.floor(Math.random() * (words.length))];
let wordSoFar = word.split('').map((char) => {
  return '-';
}).join('');

// TODO: your code to handle requests

const guessedLetters = [];                          // empty array to store guessed letters

server.post('/guess', (req, res) => {
  const currentGuess = req.body.letter.toLowerCase();
  if (Number(currentGuess) == currentGuess || currentGuess.length > 1) {
    // error re: guess is a number or has multiple characters
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Error: Guesses should be a single letter and cannot be a number.' });
  } else if (guessedLetters.includes(currentGuess)) {
    // error re: duplicate
    res.status(STATUS_USER_ERROR);
    res.json({ error: `You already guessed ${currentGuess}` });
  }

  guessedLetters.push(currentGuess);
  res.status(STATUS_SUCCESS);
  res.send(`You guessed: ${currentGuess}`);
});

server.get('/guess', (req, res) => {
  console.log(word);
  if (guessedLetters.length > 0) {
    for (let i = 0; i < word.length; i++) {
      if (guessedLetters.includes(word[i])) {
        console.log('check: ', wordSoFar[i], word[i]);
        wordSoFar.split('')[i] = 'x';
        console.log('letter included in ', word);
      }
    }
  }
  res.status(STATUS_SUCCESS);
  res.json({ wordSoFar: `${wordSoFar}`, guesses: `${guessedLetters}` });
});

server.listen(3000);
