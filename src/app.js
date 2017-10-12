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



// Start setup.
const words = readWords();
const randNum = Math.floor(Math.random() * Object.keys(words).length);
let word = words[randNum].toLowerCase(); word = word.slice(0, -1); // Retrive word and remove carriage return.
const guesses = [];
let wordSoFar = '';
for (let i = 0; i < word.length; i++) {
  wordSoFar += '-';
}
console.log(word + '\n' + wordSoFar);
// End setup.

const hangman = (guess) => {
  // First check if the guess is incorrect.
  if (word.indexOf(guess) === -1) {
    console.log('Sorry, your guess was incorrect.');
    return;
  }

  console.log('Your guess was correct.');
  let tempWord = word;
  for (let i = 0; i < word.length; i++) {
    if (guess === word[i]) {
      if (word[i] !== word[i].toLowerCase()) { // If the letter is upper-case, then
        guess = guess.toUpperCase(); // keep it upper-case, regardless of which case it was guessed in.
      }
      wordSoFar = wordSoFar.substr(0, i) + guess + wordSoFar.substr(i + 1);
    }
  }

  console.log(wordSoFar);
}

server.get('/', (req, res) => {
  if (guesses.length === 0) { // If we haven't made a guess yet.
    res.json({error: 'No guesses so far.'});
    return;
  }

  if (wordSoFar === word) { // If the user has already won.
    res.json({Victory: `You won! The word was '${word}'.`});
    return;
  }
  res.json({wordSoFar, guesses});
});

server.post('/guess', (req, res) => {
  const guess = req.body.letter;

  if (!guess) { // If there was no guess sent.
    res.status(STATUS_USER_ERROR);
    res.json({error: 'No guess was sent.'});
    return;
  }

  if (guess.length > 1) { // If the guess was longer than one letter.
    res.status(STATUS_USER_ERROR);
    res.json({error: 'Only one-letter guesses allowed.'});
    return;
  }

  if (guesses.indexOf(guess) !== -1) {  // If we've already guessed that letter.
    res.status(STATUS_USER_ERROR);
    res.json({error: "You've already guessed that."});
    return;
  }

  // If we pass all checks, push to guesses array and invoke hangman
  guesses.push(guess);
  hangman(guess);
  res.json({wordSoFar, guesses});
});

server.listen(3000);
