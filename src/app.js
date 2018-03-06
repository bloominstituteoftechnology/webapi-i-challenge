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
const randomWord = words[Math.floor(Math.random() * words.length)];
const guesses = [];

// TODO: your code to handle requests
server.get('/', (req, res) => {
  res.send(dashWord.join(''));
});

server.get('/guess', (req, res) => {
  const dashWord = [];
  randomWord.split('').forEach((letter) => {
    if (guesses.find(guessedLetter => { guessedLetter === letter})) {
      dashWord.push(letter);
    } else {
      dashWord.push('-');
    }
  });

  const guessedResponse = {
    wordSoFar: dashWord,
    guesses,
  };

  res.send(`Word so far: ${guessedResponse.wordSoFar}
            Guesses: ${guessedResponse.guesses}`
          );
});

server.listen(3000);
