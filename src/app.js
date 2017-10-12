const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const STATUS_USER_ERROR = 422;
const PORT = 3000;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

/* Returns a list of dictionary words from the words.txt file. */
const words = (() => {
  const contents = fs.readFileSync('words.txt', 'utf8');
  return contents.split('\n');
})();

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
    return res.json({ success: 'A winner is you!', finalWord });
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
      .json({ error: 'You have already guessed that letter' });
    return;
  }
  letter = letter.toLowerCase();
  guessedLetters.push(letter);

  finalWord.split('').forEach((finalLet, idx, word) => {
    if (finalLet === letter) wordSoFar[idx] = letter;
  });

  return res.json({ success: 'Nice Guess', guessedLetters });
});

server.listen(PORT, (err) => {
  if (err) console.log(`Error: ${err}`);
  console.log(`Server started on port: ${PORT}`);
});
