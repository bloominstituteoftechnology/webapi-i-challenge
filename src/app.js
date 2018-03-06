const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

let wordSoFar = '';
const guesses = [];
let finalWord = '';

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

const getWord = () => {
  const wordsLength = readWords().length;
  const wordList = readWords();
  const random = Math.floor(Math.random() * wordsLength);
  finalWord = wordList[random].trim(); // trim removes carriage return that appears
  wordSoFar = new Array(finalWord.length + 1).join('-');
};

const update = (letter) => {
  const finalSplit = finalWord.toLowerCase().split('');
  const soFarSplit = wordSoFar.split('');
  for (let i = 0; i < finalSplit.length; i++) {
    if (finalSplit[i] === letter) {
      soFarSplit[i] = letter;
    }
  }
  wordSoFar = soFarSplit.join('');
};

server.post('/guess', (req, res) => {
  let { letter } = req.body;
  letter = letter.toLowerCase();
  if (!letter) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'User must provide a letter.' });
  } else if (letter.length !== 1) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'User must provide single letter only.' });
  } else if (typeof letter !== 'string') {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Letter must be a string.' });
  } else if (guesses.includes(letter)) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: `The letter ${letter} was already guessed!` });
  } else {
    guesses.push(letter);
    update(letter);
    res.status(STATUS_SUCCESS);
    res.send({ status: 'success' });
  }
});

server.get('/guess', (req, res) => {
  res.status(STATUS_SUCCESS);
  res.send({
    wordSoFar,
    guesses,
    finalWord,
  });
});

getWord();
server.listen(3000);
