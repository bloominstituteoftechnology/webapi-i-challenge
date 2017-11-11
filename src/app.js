const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const STATUS_USER_ERROR = 422;

const server = express();
server.use(bodyParser.json());

const readWords = () => {
  const contents = fs.readFileSync('words.txt', 'utf8');
  return contents.split('\n');
};
const isLetter = str =>
  str.length === 1 && str.toLowerCase() !== str.toUpperCase();
const finalWord = words[Math.floor(Math.random() * words.length)]
  .toLowerCase()
  .replace(/(\r)/, '');
const wordSoFar = Array(finalWord.length - 1).fill('-');
const guessedLetters = [];
// TODO: your code to handle requests

server.get('/guess', (req, res) => {
  if (finalWord === wordSoFar.join('')) {
    return res.json({ success: 'You win', finalWord });
  }

  return res.json({
    wordSoFar: wordSoFar.join(''),
    guesses: guessedLetters,
  });
});

server.post('/guess', (req, res) => {
  let { letter } = req.body;
  const letterPositions = [];

  if (!letter || !isLetter(letter)) {
    res
      .status(STATUS_USER_ERROR)
      .json({ error: 'You must supply a single letter as the guess' });
    return;
  }
  if (guessedLetters.includes(letter)) {
    res
      .status(STATUS_USER_ERROR)
      .json({ error: 'You already guessed that letter' });
    return;
  }
  letter = letter.toLowerCase();
  guessedLetters.push(letter);
  if (finalWord.includes(letter)) {
    let pos = finalWord.indexOf(letter);
    while (pos !== -1) {
      letterPositions.push(pos);
      pos = finalWord.indexOf(letter, pos + 1);
    }

    letterPositions.forEach((idx) => {
      wordSoFar[idx] = letter;
    });
  }

  return res.json({ success: 'Good Guess' });
});

server.listen(3000);
