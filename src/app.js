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

// TODO: your code to handle requests
const words = readWords();
const randNum = Math.floor(Math.random() * Object.keys(words).length);
let word = words[randNum].toLowerCase(); word = word.slice(0, -1); // Retrive word and remove carriage return.
const guesses = [];
let wordSoFar = '';
for (let i = 0; i < word.length; i++) {
  wordSoFar += '-';
}
console.log(word + '\n' + wordSoFar);
}
server.get('/', (req, res) => {
  if (guesses.length === 0) { // If we haven't made a guess yet.
    res.json({error: 'No guesses yet.'});
    return;
  }

  if (wordSoFar === word) { // If the user has already won.
    res.json({Victory: `Wow! You won! The word was '${word}'.`});
    return;
  }
  res.json({wordSoFar, guesses});
});

server.post('/guess', (req, res) => {
  const guess = req.body.letter;

  if (!guess) { // If there was no guess sent.
    res.status(STATUS_USER_ERROR);
    res.json({error: 'Please enter a guess.'});
    return;
  }

  if (guess.length !== 1) { // If the guess was longer than one letter.
    res.status(STATUS_USER_ERROR);
    res.json({error: 'One-letter guesses only, Please.'});
    return;
  }

  if (guesses.indexOf(guess) !== -1) {  // If we've already guessed that letter.
    res.status(STATUS_USER_ERROR);
    res.json({error: "Whoops, you already guessed that!"});
    return;
  }

 
  guesses.push(guess);
  hangman(guess);
  res.json({wordSoFar, guesses});
});

server.listen(3000);


