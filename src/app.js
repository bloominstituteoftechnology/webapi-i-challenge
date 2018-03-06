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
  return contents.split('\r\n');
};
const randomWords = readWords();
// const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
const randomWord = 'test';
let guessingWord = '';

for (let i = 0; i < randomWord.length; i++) {
  guessingWord += '-';
}

const output = {
  wordSoFar: guessingWord,
  guesses: {},
};

server.post('/guess', (req, res) => {
  const { letter } = req.body;

  if (randomWord.includes(letter)) {
    let out = output.wordSoFar.split('');
    for (let i = randomWord.indexOf(letter); i < randomWord.length; i++ ) {
      if (randomWord[i] === letter) {
        out.splice(i, 1, letter);
      }
    }
    out = out.join('');
    output.wordSoFar = out;
    res.status(STATUS_SUCCESS);
    if (out === randomWord) {
      res.send(`Congrats you've won: ${out}`);
    } else {
      res.send(`Nice this is what the word looks like now: ${out}`);
    }
  } else {
    res.status(STATUS_USER_ERROR);
    res.send({ error: `Error message: Letter ${letter} Was Not Found` });
  }
});

server.listen(3000);
