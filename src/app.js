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
const index = Math.floor(Math.random() * wordsList.length);
const word = wordsList[index];
const guesses = {};
let wrongGuesses = 0;

const handleError = (msg, res) => {
  res.status(STATUS_USER_ERROR);
  res.json(msg);
  return;
};
server.get('/guess', (req, res) => {
  const wordSoFar = word.split('').map((letter) => {
    if (guesses[letter]) {
      return letter;
    }
    return '-';
  })
  .join('');
  res.json({ wordSoFar , guesses });
});

server.post('/guess', (req, res) => {
  const { letter } = req.body;
  if(wrongGuesses >= 20) {
    return handleError({ error: 'Too many guesses.' }, res);
  }
  if (!letter || letter.length !== 1 || guesses[letter]) {
    return handleError({
      error:  'Guess must be a new single lowercase letter you have not tried.'}, res);
  }
  if (!word.split('').includes(letter)) {
    wrongGuesses++;
    return handleError({ error: `Wrong guess- only ${20-wrongGuesses} left.` }, res);
  }
  guesses[letter] = true;
  res.json({ guesses });
});

server.listen(3000, () => {
  // console.log('server is running on port 3000');
});
