const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const STATUS_USER_ERROR = 422;
const PORT = 3333;
const hangman = express();

// to enable parsing of json bodies for post requests
hangman.use(bodyParser.json());

/* Returns a list of dictionary words from the words.txt file. */
const readWords = () => {
  const contents = fs.readFileSync('words.txt', 'utf8');
  return contents.split('\n');
};

const dictionaryIndex = Math.floor(Math.random() * (readWords().length + 1));
const finalWord = readWords()[dictionaryIndex];

const guesses = {};

// TODO: your code to handle requests
hangman.get('/', (req, res) => {
  // console.log(Object.keys(guesses));
  const wordSoFar = '-'.repeat(finalWord.length).split('');

  Object.keys(guesses).forEach((guess) => {
    let guessIndex = finalWord.indexOf(guess);
    const correctGuessIndices = [];

    while (guessIndex !== -1) {
      correctGuessIndices.push(guessIndex);
      guessIndex = finalWord.indexOf(guess, guessIndex + 1);
      correctGuessIndices.forEach((i) => {
        wordSoFar[i] = guess;
      });
    }
    console.log(guess, correctGuessIndices);
  });
  console.log(wordSoFar);

  if (wordSoFar.join('') === finalWord) res.send(`You guessed correctly the word is ${finalWord}`);

  res.json({ wordSoFar, guesses });
});


// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
//     at validateHeader

// { "letter" : "b"}
// { "a" : true, "b" : true } => guesses

// TODO keep track of guesses and provide that number in get response
hangman.post('/guess', (req, res) => {
  // no letter provided for guess
  if (!req.body.letter) {
    res.status(STATUS_USER_ERROR).json({ error: 'Must provide a letter in the request body' });
    return;
  }
  console.log(req.body.letter.length);
  // must guess a single letter
  if (req.body.letter.length > 1) {
    res.status(STATUS_USER_ERROR).json({ error: 'Only guess one letter at a time' });
    return;
  }

  // letter already guessed
  if (guesses[req.body.letter]) {
    res.status(STATUS_USER_ERROR).json({ error: `You already guessed the letter ${req.body.letter}` });
    return;
  }

  guesses[req.body.letter] = true;
  console.log(guesses);
  console.log(finalWord);
  res.json(guesses);
});

hangman.listen(PORT);
